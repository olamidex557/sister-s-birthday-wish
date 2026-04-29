import { useCallback, useRef, useState } from "react";
import { Sparkles, Lock } from "lucide-react";

const COLORS = ["#f8c8d8", "#c9a0dc", "#9b72cf", "#f3d77a", "#ffffff", "#e88aab", "#fde2a7"];

type Piece = {
  x: number; y: number; vx: number; vy: number;
  rot: number; vr: number; color: string; size: number;
  shape: "rect" | "circle" | "star";
  life: number;
};

export function SecretReveal({ message }: { message: string }) {
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef<number | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    piecesRef.current = piecesRef.current.filter(
      (p) => p.life > 0 && p.y < window.innerHeight + 40,
    );

    for (const p of piecesRef.current) {
      p.vy += 0.16;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, p.life / 60);
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // star
        const s = p.size;
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const r = i % 2 === 0 ? s / 2 : s / 4;
          const a = (i * Math.PI) / 5;
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
      }
      ctx.restore();
    }

    if (piecesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, []);

  const reveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // origin = button center
    const r = btnRef.current?.getBoundingClientRect();
    const cx = r ? r.left + r.width / 2 : window.innerWidth / 2;
    const cy = r ? r.top + r.height / 2 : window.innerHeight / 2;

    // burst: confetti + sparkle stars
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      piecesRef.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        shape: Math.random() > 0.5 ? "rect" : "circle",
        life: 180,
      });
    }
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      piecesRef.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        color: Math.random() > 0.5 ? "#f3d77a" : "#ffffff",
        size: 10 + Math.random() * 8,
        shape: "star",
        life: 140,
      });
    }

    setRevealed(true);
    if (!rafRef.current) tick();
  }, [tick]);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="font-script text-2xl text-plum/70">psst… one more thing</p>
      <h2 className="font-display text-4xl text-foreground md:text-5xl">A secret, just for you</h2>

      {!revealed ? (
        <button
          ref={btnRef}
          onClick={reveal}
          className="group relative mt-2 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose via-lavender to-plum px-8 py-4 text-base font-semibold text-white shadow-[0_15px_45px_-10px_color-mix(in_oklab,var(--plum)_55%,transparent)] transition-all hover:scale-105 active:scale-95"
        >
          <span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            aria-hidden="true"
          />
          <Lock className="h-4 w-4" />
          Reveal the secret ✨
        </button>
      ) : (
        <div
          className="relative mt-2 max-w-xl rounded-3xl bg-cream/80 px-8 py-10 ring-1 ring-rose/40 backdrop-blur"
          style={{ animation: "scale-in 0.5s ease-out" }}
        >
          <Sparkles className="absolute -left-3 -top-3 h-7 w-7 text-gold" style={{ animation: "glow 2s ease-in-out infinite" }} />
          <Sparkles className="absolute -right-3 -bottom-3 h-7 w-7 text-gold" style={{ animation: "glow 2s ease-in-out 0.5s infinite" }} />
          <p className="font-script text-3xl leading-snug text-plum md:text-4xl">
            {message}
          </p>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        aria-hidden="true"
      />
    </div>
  );
}
