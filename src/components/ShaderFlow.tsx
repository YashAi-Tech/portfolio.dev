import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Transform, Triangle } from 'ogl';

interface ShaderFlowProps {
  brightness?: number;
  iterations?: number;
  flowSpeed?: [number, number];
  scale?: number;
  colorLowA?: [number, number, number];
  colorHighA?: [number, number, number];
  fadeCx?: number;
  fadeCy?: number;
  fadeRx?: number;
  fadeRy?: number;
  className?: string;
}

const vertexShader = `
attribute vec2 position;
void main(){
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 uR;
uniform float uT;
uniform vec2 uV;
uniform float uS;
uniform float uTw;
uniform float uDe;
uniform float uMs;
uniform float uB;
uniform int uIt;
uniform vec3 uColorLow;
uniform vec3 uColorHigh;
uniform vec3 uBgColor;
uniform vec4 uFadeShape;

float h(vec2 p){
  return sin(p.x + sin(p.y + uT * uV.x)) * sin(p.y * p.x * 0.1 + uT * uV.y);
}

float fadeAlpha(float d){
  float t = clamp(1.0 - d, 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

void main(){
  vec2 frag = gl_FragCoord.xy / uR;
  vec2 p = frag - 0.5;
  p.x *= uR.x / uR.y;
  p *= uS;

  float ms = uT * uMs * 0.1;
  vec2 d = vec2(sin(ms), cos(ms)) * 0.1;
  float kt = uTw * 0.01;
  float kd = 1.0 / uDe;

  vec2 e = vec2(0.05, 0.0);
  vec2 r = vec2(0.0);
  for(int i = 0; i < 24; i++){
    if(i >= uIt) break;
    float a = h(p);
    float b = h(p + e.xy);
    float c = h(p + e.yx);
    vec2 q = vec2(b - a, c - a) * 20.0;
    p += vec2(-q.y, q.x) * kt + q * kd + d;
    r = q;
  }

  float t = clamp(length(r) * 0.5, 0.0, 1.0);
  vec3 col = mix(uColorLow, uColorHigh, t) * uB;

  vec2 ndc = vec2(frag.x, 1.0 - frag.y);
  float aspect = uR.x / uR.y;
  float dx = ((ndc.x - uFadeShape.x) * aspect) / uFadeShape.z;
  float dy = (ndc.y - uFadeShape.y) / uFadeShape.w;
  float fa = fadeAlpha(sqrt(dx * dx + dy * dy));

  vec3 outColor = mix(uBgColor, col, fa);
  gl_FragColor = vec4(outColor, 1.0);
}
`;

const defaultFlowSpeed: [number, number] = [0, 0.1];
const defaultColorLow: [number, number, number] = [0.18, 0.2, 0.3];
const defaultColorHigh: [number, number, number] = [0.55, 0.38, 0.32];

function parseColor(str: string): [number, number, number] | null {
  const trimmed = str.trim();
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length !== 6) return null;
    const num = parseInt(hex, 16);
    return isNaN(num) ? null : [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  }
  const match = trimmed.match(/(\d+(?:\.\d+)?)/g);
  if (!match || match.length < 3) return null;
  return [Number(match[0]) / 255, Number(match[1]) / 255, Number(match[2]) / 255];
}

function getBackgroundColor(element: HTMLElement): [number, number, number] {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) return [0.039, 0.039, 0.039]; // #0a0a0a
  return [0.984, 0.984, 0.984]; // #fbfbfb
}

export const ShaderFlow: React.FC<ShaderFlowProps> = ({
  brightness = 3,
  iterations = 10,
  flowSpeed = defaultFlowSpeed,
  scale = 6,
  colorLowA = defaultColorLow,
  colorHighA = defaultColorHigh,
  fadeCx = 0.5,
  fadeCy = 0,
  fadeRx = 1.4,
  fadeRy = 0.6,
  className = "absolute inset-0 h-full w-full grayscale"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef<ShaderFlowProps>({
    brightness,
    iterations,
    flowSpeed,
    scale,
    colorLowA,
    colorHighA,
    fadeCx,
    fadeCy,
    fadeRx,
    fadeRy
  });

  useEffect(() => {
    propsRef.current = {
      brightness,
      iterations,
      flowSpeed,
      scale,
      colorLowA,
      colorHighA,
      fadeCx,
      fadeCy,
      fadeRx,
      fadeRy
    };
  }, [brightness, iterations, flowSpeed, scale, colorLowA, colorHighA, fadeCx, fadeCy, fadeRx, fadeRy]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 1),
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });

    const gl = renderer.gl;
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uT: { value: 0 },
        uR: { value: [1, 1] },
        uV: { value: [...flowSpeed] },
        uS: { value: scale },
        uTw: { value: 50 },
        uDe: { value: 200 },
        uMs: { value: 2.5 },
        uB: { value: brightness },
        uIt: { value: iterations },
        uColorLow: { value: [...colorLowA] },
        uColorHigh: { value: [...colorHighA] },
        uBgColor: { value: getBackgroundColor(document.documentElement) },
        uFadeShape: { value: [fadeCx, fadeCy, fadeRx, fadeRy] },
      },
    });

    const scene = new Transform();
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uR.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let animationFrameId = 0;
    let isVisible = true;
    let isIntersecting = true;
    const startTime = performance.now();

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isIntersecting = entry.isIntersecting;
        }
      },
      { rootMargin: '100px' }
    );
    intersectionObserver.observe(container);

    const updateThemeBg = () => {
      program.uniforms.uBgColor.value = getBackgroundColor(document.documentElement);
    };

    const mutationObserver = new MutationObserver(updateThemeBg);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style'],
    });
    updateThemeBg();

    const render = () => {
      if (isVisible && isIntersecting) {
        const p = propsRef.current;
        program.uniforms.uT.value = (performance.now() - startTime) / 1000;
        program.uniforms.uV.value = [...(p.flowSpeed ?? defaultFlowSpeed)];
        program.uniforms.uS.value = p.scale ?? 6;
        program.uniforms.uB.value = p.brightness ?? 3;
        program.uniforms.uIt.value = p.iterations ?? 10;
        program.uniforms.uColorLow.value = [...(p.colorLowA ?? defaultColorLow)];
        program.uniforms.uColorHigh.value = [...(p.colorHighA ?? defaultColorHigh)];
        program.uniforms.uFadeShape.value = [
          p.fadeCx ?? 0.5,
          p.fadeCy ?? 0,
          p.fadeRx ?? 1.4,
          p.fadeRy ?? 0.6,
        ];
        renderer.render({ scene });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={className} />;
};
