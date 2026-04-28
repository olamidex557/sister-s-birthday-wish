import { useCallback, useRef, useState } from "react";
import { PartyPopper } from "lucide-react";

const CONFETTI_COLORS = ["#f8c8d8", "#c9a0dc", "#9b72cf", "#f3d77a", "#ffffff", "#e88aab"];
const BALLOON_COLORS = ["#f8c8d8", "#c9a0dc", "#fde2a7", "#e88aab", "#b8a0e0"];

type Piece = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
  size: number;
  shape: "rect" | "circle";
};

export function Celebrate() {
  const [balloons, setBalloons] = useState<{ id: number; left: number; color: string; delay: number; size: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const piecesRef = useRef<Piece[]>([]);
  const idRef = useRef(0);

  const burst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;
    for (let i = 0; i < 140; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      piecesRef.current.push({
        id: idRef.current++,
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 8,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      });
    }

    // balloons
    const newBalloons = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      left: 5 + Math.random() * 90,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      delay: Math.random() * 0.8,
      size: 50 + Math.random() * 40,
    }));
    setBalloons((b) => [...b, ...newBalloons]);
    setTimeout(() => {
      setBalloons((b) => b.filter((x) => !newBalloons.find((n) => n.id === x.id)));
    }, 9000);

    if (!rafRef.current) tick();
  }, []);

  const tick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    piecesRef.current = piecesRef.current.filter((p) => p.y < window.innerHeight + 40);
    for (const p of piecesRef.current) {
      p.vy += 0.18;
      p.vx *= 0.995;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (piecesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-4xl text-plum md:text-5xl">A little surprise for you</h2>
        <p className="max-w-xl text-base text-foreground/70 md:text-lg">
          Tap the button — because every birthday deserves a tiny burst of magic.
        </p>
        <button
          onClick={burst}
          className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-plum via-lavender to-rose px-8 py-4 text-lg font-semibold text-white shadow-[0_15px_40px_-10px_color-mix(in_oklab,var(--plum)_55%,transparent)] transition-all hover:scale-105 hover:shadow-[0_20px_50px_-10px_color-mix(in_oklab,var(--plum)_70%,transparent)] active:scale-95"
        >
          <PartyPopper className="h-5 w-5 transition-transform group-hover:rotate-12" />
          Celebrate 🎉
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
        {balloons.map((b) => (
          <div
            key={b.id}
            className="absolute bottom-0"
            style={{
              left: `${b.left}%`,
              animation: `balloon-rise ${7 + b.delay}s ease-in ${b.delay}s forwards`,
            }}
          >
            <div
              className="rounded-full shadow-lg"
              style={{
                width: b.size,
                height: b.size * 1.2,
                background: `radial-gradient(circle at 30% 30%, white 0%, ${b.color} 45%, color-mix(in oklab, ${b.color} 70%, black) 100%)`,
              }}
            />
            <div
              className="mx-auto h-16 w-px"
              style={{ background: "rgba(0,0,0,0.25)" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
