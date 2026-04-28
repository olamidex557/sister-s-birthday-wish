import { useEffect, useRef } from "react";

export function CursorSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#f8c8d8", "#c9a0dc", "#fde2a7", "#ffffff", "#e88aab"];
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string };
    const parts: P[] = [];
    let lastX = 0,
      lastY = 0;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < 4) return;
      lastX = e.clientX;
      lastY = e.clientY;
      const n = Math.min(3, Math.floor(dist / 8) + 1);
      for (let i = 0; i < n; i++) {
        parts.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.3 - Math.random() * 0.6,
          life: 0,
          max: 50 + Math.random() * 40,
          size: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.005;
        const alpha = 1 - p.life / p.max;
        if (alpha <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />;
}
