import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export function ScratchReveal({ message }: { message: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#c9a0dc");
      grad.addColorStop(0.5, "#e88aab");
      grad.addColorStop(1, "#fde2a7");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "600 16px 'Nunito Sans', system-ui";
      ctx.textAlign = "center";
      ctx.fillText("✨ Scratch here to reveal ✨", w / 2, h / 2);
    };
    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // sample transparency
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 16) if (data[i] === 0) cleared++;
    if (cleared / (data.length / 16) > 0.55) setRevealed(true);
  };

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-48 w-full max-w-md overflow-hidden rounded-2xl bg-cream shadow-xl ring-1 ring-rose/40"
    >
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <div>
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-gold" />
          <p className="font-script text-2xl text-plum">{message}</p>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 touch-none transition-opacity duration-700 ${revealed ? "pointer-events-none opacity-0" : "opacity-100"}`}
        onPointerDown={(e) => {
          drawing.current = true;
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
          const { x, y } = pos(e);
          scratch(x, y);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const { x, y } = pos(e);
          scratch(x, y);
        }}
        onPointerUp={() => (drawing.current = false)}
      />
    </div>
  );
}
