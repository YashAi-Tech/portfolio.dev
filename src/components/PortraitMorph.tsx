import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Transform, Triangle, Texture } from 'ogl';

interface PortraitMorphProps {
  srcA: string;
  srcB?: string;
  alt: string;
  className?: string;
}

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uProgress;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uImageSize;
uniform vec2 uOrigin;
uniform vec2 uDirection;

varying vec2 vUv;

vec2 coverUv(vec2 uv) {
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageSize.x / uImageSize.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageSize.y / uImageSize.x), 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 baseUv = coverUv(uv);

  float p = uProgress;
  float bell = 4.0 * p * (1.0 - p);

  vec2 dir = normalize(uDirection + vec2(0.0001));
  float along = dot(uv - uOrigin, dir);
  float distGradient = (along + 1.4) / 2.8;

  float warpLow = fbm(uv * 1.8 + uTime * 0.05) - 0.5;
  float warpHi = fbm(uv * 5.5 - uTime * 0.04 + 13.0) - 0.5;
  float warp = warpLow * 0.55 + warpHi * 0.18;

  float field = distGradient + warp;

  float remapped = mix(-0.25, 1.25, p);
  float edgeWidth = 0.07;
  float mask = smoothstep(remapped - edgeWidth, remapped + edgeWidth, field);
  mask = 1.0 - mask;

  vec2 perp = vec2(-dir.y, dir.x);
  float ripplePhase = (field - remapped) * 14.0;
  float ripple = sin(ripplePhase) * 0.5 + 0.5;
  float edgeBand = 1.0 - smoothstep(0.0, edgeWidth * 1.6, abs(field - remapped));
  float pushAmount = ripple * edgeBand * 0.025 * bell;
  vec2 pushUv = uv + perp * pushAmount;
  vec2 baseUvA = coverUv(pushUv);
  vec2 baseUvB = coverUv(pushUv);

  vec4 texA = texture2D(uTexA, baseUvA);
  vec4 texB = texture2D(uTexB, baseUvB);

  vec4 color = mix(texA, texB, mask);

  float darken = edgeBand * 0.35 * bell;
  color.rgb *= 1.0 - darken;

  gl_FragColor = color;
}
`;

export const PortraitMorph: React.FC<PortraitMorphProps> = ({
  srcA,
  srcB = srcA,
  alt,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isHoveredRef = useRef(false);
  const progressRef = useRef(0);
  const originRef = useRef<[number, number]>([0.5, 0.5]);
  const directionRef = useRef<[number, number]>([1, 0]);
  const lastPointerRef = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const scene = new Transform();
    const texA = new Texture(gl, { generateMipmaps: false });
    const texB = new Texture(gl, { generateMipmaps: false });
    const imageSize: [number, number] = [1, 1];

    const loadImage = (url: string, tex: Texture) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          tex.image = img;
          imageSize[0] = img.naturalWidth;
          imageSize[1] = img.naturalHeight;
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTexA: { value: texA },
        uTexB: { value: texB },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uImageSize: { value: imageSize },
        uOrigin: { value: [0.5, 0.5] },
        uDirection: { value: [1, 0] },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      program.uniforms.uResolution.value = [w * renderer.dpr, h * renderer.dpr];
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let animationFrameId = 0;
    let lastTime = performance.now();
    let totalTime = 0;
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      totalTime += dt;

      const target = isHoveredRef.current ? 1 : 0;
      const speed = 1 - Math.exp(-(isHoveredRef.current ? 2.4 : 2.0) * dt);
      progressRef.current += (target - progressRef.current) * speed;

      program.uniforms.uTime.value = totalTime;
      program.uniforms.uProgress.value = progressRef.current;
      program.uniforms.uOrigin.value = originRef.current;
      program.uniforms.uDirection.value = directionRef.current;
      program.uniforms.uImageSize.value = imageSize;

      renderer.render({ scene });
      animationFrameId = requestAnimationFrame(animate);
    };

    Promise.all([loadImage(srcA, texA), loadImage(srcB, texB)])
      .then(() => {
        setIsLoaded(true);
        lastTime = performance.now();
        animate();
      })
      .catch(() => {
        setIsLoaded(false);
      });

    const getEdgeDirection = (x: number, y: number): [number, number] => {
      const right = 1 - x;
      const top = 1 - y;
      const min = Math.min(x, right, y, top);
      if (min === x) return [1, 0];
      if (min === right) return [-1, 0];
      if (min === y) return [0, 1];
      return [0, -1];
    };

    const onPointerEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      originRef.current = [x, y];
      directionRef.current = getEdgeDirection(x, y);
      lastPointerRef.current = { x, y, t: performance.now() };
      isHoveredRef.current = true;
    };

    const onPointerLeave = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      originRef.current = [x, y];
      directionRef.current = getEdgeDirection(x, y).map(v => -v) as [number, number];
      isHoveredRef.current = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const prev = lastPointerRef.current;
      if (prev && performance.now() - prev.t < 80 && progressRef.current < 0.15) {
        const dx = x - prev.x;
        const dy = y - prev.y;
        const len = Math.hypot(dx, dy);
        if (len > 0.01) {
          directionRef.current = [dx / len, dy / len];
        }
      }
      lastPointerRef.current = { x, y, t: performance.now() };
    };

    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('pointermove', onPointerMove);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('pointermove', onPointerMove);
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [srcA, srcB]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', filter: 'grayscale(100%)' }}
    >
      {!isLoaded && (
        <img
          src={srcA}
          alt={alt}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />
      )}
    </div>
  );
};
