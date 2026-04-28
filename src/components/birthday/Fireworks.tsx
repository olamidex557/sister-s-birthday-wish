import { useEffect, useRef, useState } from "react";

const COLORS = ["#f8c8d8", "#c9a0dc", "#fde2a7", "#ffffff", "#e88aab", "#9b72cf"];

export function Fireworks() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string };
    const parts: P[] = [];

    const launch = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = Math.random() * w;
      const cy = h * (0.2 + Math.random() * 0.4);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const n = 70;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const sp = 2 + Math.random() * 3;
        parts.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 60 + Math.random() * 30,
          color,
        });
      }
    };

    const interval = setInterval(launch, 900);
    let raf = 0;
    const loop = () => {
      ctx.fillStyle = "rgba(248,232,238,0.18)";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.99;
        const alpha = 1 - p.life / p.max;
        if (alpha <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();
    launch();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
