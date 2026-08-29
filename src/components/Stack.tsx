import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { RotateCcw } from 'lucide-react';

interface TechChip {
  label: string;
  slug?: string;
  bg: string;
  fg: string;
  iconUrl?: string;
}

const stackItems: TechChip[] = [
  { label: 'Figma', slug: 'figma', bg: '#1f1f1f', fg: '#ffffff', iconUrl: 'https://svgl.app/library/figma.svg' },
  { label: 'React', slug: 'react', bg: '#1FB6CB', fg: '#ffffff' },
  { label: 'Next.js', slug: 'nextdotjs', bg: '#1f1f1f', fg: '#ffffff' },
  { label: 'TypeScript', slug: 'typescript', bg: '#2F74C0', fg: '#ffffff' },
  { label: 'shadcn/ui', slug: 'shadcnui', bg: '#5b54ff', fg: '#ffffff' },
  { label: 'Cursor', slug: 'cursor', bg: '#111111', fg: '#ffffff' },
  { label: 'GSAP', slug: 'gsap', bg: '#0AE448', fg: '#0a0a0a' },
  { label: 'GitHub', slug: 'github', bg: '#181717', fg: '#ffffff' },
  { label: 'Vercel', slug: 'vercel', bg: '#0a0a0a', fg: '#ffffff' },
  { label: 'Tailwind CSS', slug: 'tailwindcss', bg: '#2BBCF5', fg: '#ffffff' },
];

const ChipView: React.FC<{ chip: TechChip }> = ({ chip }) => (
  <div
    className="dark:ring-1 dark:ring-white/15 inline-flex items-center gap-2 p-1 pr-2.5 text-[15px] font-medium tracking-tight sm:text-[16px] shadow-sm select-none"
    style={{ backgroundColor: chip.bg, color: chip.fg, borderRadius: '14px' }}
  >
    <span
      className="inline-flex h-8 w-8 items-center justify-center bg-white/95 shrink-0"
      style={{ borderRadius: '10px' }}
      aria-hidden="true"
    >
      <img
        src={chip.iconUrl ?? `https://cdn.simpleicons.org/${chip.slug}`}
        alt=""
        width={18}
        height={18}
        className="h-5 w-5 object-contain"
        draggable={false}
      />
    </span>
    <span className="whitespace-nowrap">{chip.label}</span>
  </div>
);

export const Stack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);
  const chipsDomRef = useRef<(HTMLDivElement | null)[]>([]);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const measurement = measurementRef.current;
    if (!container || !measurement) return;

    let isCleanedUp = false;
    let animId = 0;

    const { Engine, Runner, World, Bodies, Body, Mouse, MouseConstraint, Events } = Matter;

    const chipDimensions = Array.from(measurement.children).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        w: Math.max(90, rect.width || 120),
        h: Math.max(32, rect.height || 38),
      };
    });

    let width = container.clientWidth;
    let height = container.clientHeight;

    const engine = Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height - 16 + 200, width * 3, 400, { isStatic: true });
    const leftWall = Bodies.rectangle(-184, height / 2, 400, height * 4, { isStatic: true });
    const rightWall = Bodies.rectangle(width - 16 + 200, height / 2, 400, height * 4, { isStatic: true });
    World.add(world, [ground, leftWall, rightWall]);

    // Create chip physics bodies
    const chipBodies = stackItems.map((chip, i) => {
      const dim = chipDimensions[i] ?? { w: 120, h: 38 };
      const halfW = dim.w / 2;
      const minX = 16 + halfW + 4;
      const maxX = Math.max(minX + 1, width - 16 - halfW - 4);
      const startX = minX + Math.random() * (maxX - minX);
      const startY = -80 - 65 * i - 100 * Math.random();

      const body = Bodies.rectangle(startX, startY, dim.w, dim.h, {
        chamfer: { radius: 14 },
        restitution: 0.35,
        friction: 0.5,
        frictionAir: 0.025,
        density: 0.0018,
        angle: (Math.random() - 0.5) * 0.4,
      });

      World.add(world, body);
      return { chip, body, width: dim.w, height: dim.h };
    });

    // Mouse Interaction
    const mouse = Mouse.create(container);
    if ((mouse as any).mousewheel) {
      const el = (mouse as any).element;
      el?.removeEventListener?.('wheel', (mouse as any).mousewheel);
      el?.removeEventListener?.('DOMMouseScroll', (mouse as any).mousewheel);
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    Events.on(mouseConstraint, 'startdrag', () => {
      container.style.cursor = 'grabbing';
    });
    Events.on(mouseConstraint, 'enddrag', () => {
      container.style.cursor = 'grab';
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    const updateChipPositions = () => {
      if (isCleanedUp) return;
      for (let i = 0; i < chipBodies.length; i++) {
        const item = chipBodies[i];
        const domEl = chipsDomRef.current[i];
        if (!item || !domEl) continue;
        const { x, y } = item.body.position;
        const angle = item.body.angle;
        domEl.style.transform = `translate3d(${x - item.width / 2}px, ${y - item.height / 2}px, 0) rotate(${angle}rad)`;
      }
      animId = requestAnimationFrame(updateChipPositions);
    };

    animId = requestAnimationFrame(updateChipPositions);

    const resizeObserver = new ResizeObserver(() => {
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW !== width || newH !== height) {
        Body.setPosition(ground, { x: newW / 2, y: newH - 16 + 200 });
        Body.setPosition(leftWall, { x: -184, y: newH / 2 });
        Body.setPosition(rightWall, { x: newW - 16 + 200, y: newH / 2 });
        width = newW;
        height = newH;
      }
    });

    resizeObserver.observe(container);

    return () => {
      isCleanedUp = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [resetCount]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Stack
        </h3>
      </div>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative h-40 overflow-hidden rounded-4xl border sm:h-64">
        {/* Reset button */}
        <button
          type="button"
          onClick={() => setResetCount((c) => c + 1)}
          aria-label="Reset stack"
          className="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors cursor-pointer shadow-sm hover:bg-foreground/5"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </button>

        {/* Hidden measurement elements */}
        <div
          ref={measurementRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute top-0 left-0 flex flex-wrap gap-2"
        >
          {stackItems.map((chip) => (
            <ChipView key={`m-${chip.label}`} chip={chip} />
          ))}
        </div>

        {/* Physics Container Area */}
        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab select-none"
          style={{ touchAction: 'none' }}
        >
          {stackItems.map((chip, i) => (
            <div
              key={`${resetCount}-${chip.label}`}
              ref={(el) => (chipsDomRef.current[i] = el)}
              data-stack-chip="true"
              className="pointer-events-none absolute top-0 left-0 will-change-transform"
              style={{ transform: 'translate3d(-9999px, -9999px, 0)' }}
            >
              <ChipView chip={chip} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
