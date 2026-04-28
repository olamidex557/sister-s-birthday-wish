import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function IntroDoor({ name, onOpen }: { name: string; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = gone ? "" : "hidden";
    }
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, [gone]);

  const open = () => {
    setOpening(true);
    setTimeout(() => {
      onOpen();
      setGone(true);
    }, 1400);
  };

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-plum">
      {/* Left door */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 origin-left bg-gradient-to-br from-plum via-[color-mix(in_oklab,var(--plum)_80%,black)] to-black transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.3,1)]`}
        style={{
          transform: opening ? "perspective(1400px) rotateY(-110deg)" : "rotateY(0)",
          boxShadow: "inset -40px 0 80px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 text-gold/80">
          <div className="h-24 w-1 bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
        </div>
        <div className="absolute inset-8 rounded-3xl border border-gold/20" />
      </div>

      {/* Right door */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 origin-right bg-gradient-to-bl from-plum via-[color-mix(in_oklab,var(--plum)_80%,black)] to-black transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.3,1)]`}
        style={{
          transform: opening ? "perspective(1400px) rotateY(110deg)" : "rotateY(0)",
          boxShadow: "inset 40px 0 80px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 text-gold/80">
          <div className="h-24 w-1 bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
        </div>
        <div className="absolute inset-8 rounded-3xl border border-gold/20" />
      </div>

      {/* Center seal */}
      <div
        className={`relative z-10 flex flex-col items-center gap-8 px-6 text-center transition-all duration-700 ${
          opening ? "scale-150 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-rose/20 blur-3xl animate-pulse" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose via-gold to-rose shadow-[0_0_60px_rgba(232,138,171,0.6)]">
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/40 animate-[spin_20s_linear_infinite]" />
            <Heart className="h-12 w-12 fill-white text-white drop-shadow" />
          </div>
        </div>
        <p className="font-script text-2xl text-rose md:text-3xl">A sealed letter for</p>
        <h1 className="font-display text-5xl text-white drop-shadow-lg md:text-7xl">{name}</h1>
        <button
          onClick={open}
          className="group relative mt-4 overflow-hidden rounded-full bg-white px-10 py-4 text-base font-semibold uppercase tracking-[0.25em] text-plum shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] transition-all hover:scale-105"
        >
          <span className="relative z-10">Open your gift</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-rose via-gold to-rose transition-transform duration-500 group-hover:translate-x-0" />
        </button>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
          Best with sound on 🎵
        </p>
      </div>
    </div>
  );
}
