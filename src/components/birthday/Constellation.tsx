import { useEffect, useRef, useState } from "react";

export type Memory = { src: string; title: string; note: string };

// Heart-shape parametric points
function heartPoints(n: number, w: number, h: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    pts.push({ x: w / 2 + x * (w / 42), y: h / 2 - y * (h / 38) });
  }
  return pts;
}

export function Constellation({ memories }: { memories: Memory[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 500 });
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const el = ref.current;
      if (!el) return;
      setSize({ w: el.clientWidth, h: Math.min(560, Math.max(380, el.clientWidth * 0.6)) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!mounted) return <div ref={ref} className="h-[480px] w-full" />;

  const outline = heartPoints(80, size.w, size.h);
  const memoryStars = memories.map((_, i) =>
    outline[Math.floor((i + 0.5) * (outline.length / memories.length))],
  );

  return (
    <div ref={ref} className="relative w-full" style={{ height: size.h }}>
      <svg width={size.w} height={size.h} className="absolute inset-0">
        <defs>
          <radialGradient id="starGlow">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="#fde2a7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fde2a7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* connecting lines */}
        <path
          d={outline.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z"}
          fill="none"
          stroke="url(#starGlow)"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.5"
          style={{ animation: "dash 30s linear infinite" }}
        />
        {/* outline stars */}
        {outline.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={1 + (i % 3) * 0.4}
            fill="#fff"
            opacity={0.4 + (i % 5) * 0.1}
          >
            <animate
              attributeName="opacity"
              values="0.3;0.9;0.3"
              dur={`${2 + (i % 4)}s`}
              repeatCount="indefinite"
              begin={`${(i % 7) * 0.2}s`}
            />
          </circle>
        ))}
      </svg>

      {/* memory stars (interactive) */}
      {memoryStars.map((p, i) => (
        <button
          key={i}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive((a) => (a === i ? null : a))}
          onClick={() => setActive(active === i ? null : i)}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: p.x, top: p.y }}
          aria-label={memories[i].title}
        >
          <span className="relative block h-4 w-4">
            <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />
            <span className="absolute inset-0 rounded-full bg-white shadow-[0_0_18px_6px_rgba(253,226,167,0.7)]" />
          </span>
        </button>
      ))}

      {/* card */}
      {active !== null && (
        <div
          className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-[110%] animate-fade-up"
          style={{ left: memoryStars[active].x, top: memoryStars[active].y }}
        >
          <div className="overflow-hidden rounded-2xl bg-cream shadow-2xl ring-1 ring-rose/40">
            <img src={memories[active].src} alt={memories[active].title} className="h-32 w-full object-cover" />
            <div className="p-3 text-left">
              <p className="font-script text-lg text-plum">{memories[active].title}</p>
              <p className="text-xs text-foreground/70">{memories[active].note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
