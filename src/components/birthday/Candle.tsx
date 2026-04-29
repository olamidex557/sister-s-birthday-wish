import { useEffect, useRef, useState } from "react";
import { Mic, Hand } from "lucide-react";

export function Candle({ name }: { name: string }) {
  const [lit, setLit] = useState(true);
  const [listening, setListening] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const blowOut = () => {
    if (!lit) return;
    setLit(false);
    setTimeout(() => setWishMade(true), 900);
    stopMic();
  };

  const stopMic = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    setListening(false);
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      setListening(true);

      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        if (rms > 0.18) {
          blowOut();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setListening(false);
    }
  };

  useEffect(() => () => stopMic(), []);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="font-script text-2xl text-plum/70">make a wish</p>
      <h2 className="font-display text-4xl text-foreground md:text-5xl">
        {wishMade ? "Wish granted ✨" : "Blow out the candles"}
      </h2>

      {/* Cake stage */}
      <div className="relative h-[440px] w-[360px] md:h-[500px] md:w-[420px]">
        {/* glowing halo behind cake */}
        {lit && (
          <div
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold) 45%, transparent) 0%, transparent 60%)",
              animation: "glow 3s ease-in-out infinite",
            }}
          />
        )}

        {/* cake plate */}
        <div className="absolute bottom-2 left-1/2 h-6 w-[340px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gold/80 to-gold shadow-[0_18px_30px_-10px_rgba(85,30,90,0.35)]" />
        <div className="absolute bottom-7 left-1/2 h-3 w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cream to-rose/40" />

        {/* TIER 3 - bottom (largest) */}
        <div className="absolute bottom-9 left-1/2 h-28 w-[280px] -translate-x-1/2 overflow-hidden rounded-2xl bg-gradient-to-b from-[#fff0f5] via-rose/70 to-[color-mix(in_oklab,var(--rose)_60%,var(--plum))] shadow-[0_20px_40px_-12px_rgba(85,30,90,0.4)]">
          {/* drip frosting */}
          <div className="absolute inset-x-0 top-0 h-6 bg-cream"
            style={{
              maskImage:
                "radial-gradient(circle 10px at 10px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 30px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 50px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 70px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 90px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 110px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 130px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 150px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 170px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 190px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 210px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 230px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 250px 0, black 98%, transparent 100%), radial-gradient(circle 10px at 270px 0, black 98%, transparent 100%), linear-gradient(black,black)",
              maskComposite: "add",
            }}
          />
          {/* sprinkles */}
          <div className="absolute inset-x-0 bottom-3 flex justify-around px-4">
            {["🍓","💖","🌸","✨","💖","🍓","🌸"].map((e, i) => (
              <span key={i} className="text-base opacity-90">{e}</span>
            ))}
          </div>
          <div className="absolute bottom-10 left-0 right-0 text-center font-script text-lg text-white drop-shadow">
            Happy Birthday {name}
          </div>
        </div>

        {/* TIER 2 - middle */}
        <div className="absolute bottom-[148px] left-1/2 h-24 w-[210px] -translate-x-1/2 overflow-hidden rounded-2xl bg-gradient-to-b from-cream via-blush to-rose shadow-[0_15px_30px_-10px_rgba(85,30,90,0.35)]">
          <div className="absolute inset-x-0 top-0 h-5 bg-[color-mix(in_oklab,var(--lavender)_60%,white)]"
            style={{
              maskImage:
                "radial-gradient(circle 8px at 10px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 30px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 50px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 70px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 90px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 110px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 130px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 150px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 170px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 190px 0, black 98%, transparent 100%), radial-gradient(circle 8px at 210px 0, black 98%, transparent 100%), linear-gradient(black,black)",
            }}
          />
          {/* lace pattern dots */}
          <div className="absolute inset-x-3 top-8 grid grid-cols-8 gap-1 opacity-50">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-white" />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-2 text-center font-script text-base text-plum">
            ✨ cousin ✨
          </div>
        </div>

        {/* TIER 1 - top (smallest) */}
        <div className="absolute bottom-[244px] left-1/2 h-16 w-[140px] -translate-x-1/2 overflow-hidden rounded-2xl bg-gradient-to-b from-cream to-[color-mix(in_oklab,var(--lavender)_50%,white)] shadow-[0_10px_25px_-8px_rgba(85,30,90,0.3)]">
          <div className="absolute inset-x-0 top-0 h-4 bg-rose/80"
            style={{
              maskImage:
                "radial-gradient(circle 7px at 10px 0, black 98%, transparent 100%), radial-gradient(circle 7px at 30px 0, black 98%, transparent 100%), radial-gradient(circle 7px at 50px 0, black 98%, transparent 100%), radial-gradient(circle 7px at 70px 0, black 98%, transparent 100%), radial-gradient(circle 7px at 90px 0, black 98%, transparent 100%), radial-gradient(circle 7px at 110px 0, black 98%, transparent 100%), radial-gradient(circle 7px at 130px 0, black 98%, transparent 100%), linear-gradient(black,black)",
            }}
          />
          <div className="absolute inset-x-0 bottom-1 flex justify-center gap-1">
            <span>🌹</span><span>🌹</span><span>🌹</span>
          </div>
        </div>

        {/* THREE CANDLES on top tier */}
        {[-40, 0, 40].map((offset, i) => (
          <div key={i}>
            {/* candle body */}
            <div
              className="absolute bottom-[300px] w-3 h-16 rounded-sm shadow-md"
              style={{
                left: `calc(50% + ${offset}px)`,
                transform: "translateX(-50%)",
                background: i === 1
                  ? "repeating-linear-gradient(45deg, var(--gold) 0 4px, #fff7d1 4px 8px)"
                  : "repeating-linear-gradient(45deg, var(--rose) 0 4px, var(--cream) 4px 8px)",
              }}
            />
            {/* wick */}
            <div
              className="absolute bottom-[364px] h-2 w-px bg-foreground"
              style={{ left: `calc(50% + ${offset}px)`, transform: "translateX(-50%)" }}
            />
            {/* flame */}
            {lit && (
              <>
                <div
                  className="absolute bottom-[366px] h-10 w-5 rounded-full"
                  style={{
                    left: `calc(50% + ${offset}px)`,
                    transform: "translateX(-50%)",
                    background:
                      "radial-gradient(ellipse at 50% 80%, #fff7d1 0%, #ffd166 40%, #ff8e3c 70%, transparent 100%)",
                    animation: `flame 0.${15 + i}s ease-in-out infinite alternate`,
                    filter: "blur(0.5px)",
                    transformOrigin: "50% 100%",
                  }}
                />
                <div
                  className="absolute bottom-[366px] h-16 w-16 rounded-full opacity-60"
                  style={{
                    left: `calc(50% + ${offset}px)`,
                    transform: "translateX(-50%)",
                    background: "radial-gradient(circle, rgba(255,209,102,0.55) 0%, transparent 60%)",
                    animation: `glow ${1.8 + i * 0.3}s ease-in-out infinite`,
                  }}
                />
              </>
            )}
            {/* smoke */}
            {!lit && (
              <div
                className="absolute bottom-[366px]"
                style={{ left: `calc(50% + ${offset}px)`, transform: "translateX(-50%)" }}
              >
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="absolute h-3 w-3 rounded-full bg-foreground/30"
                    style={{ animation: `smoke 2.2s ease-out ${j * 0.3 + i * 0.1}s forwards` }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* sparkles around cake */}
        {lit && Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-gold opacity-80"
            style={{
              left: `${10 + i * 11}%`,
              bottom: `${30 + (i % 3) * 40}px`,
              animation: `glow ${2 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          >
            ✨
          </span>
        ))}
      </div>

      {!wishMade && (
        <div className="flex flex-col items-center gap-3">
          {!listening ? (
            <button
              onClick={startMic}
              className="inline-flex items-center gap-2 rounded-full bg-plum/90 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-plum"
            >
              <Mic className="h-4 w-4" /> Use mic to blow them out
            </button>
          ) : (
            <p className="text-sm text-plum animate-pulse">Listening… blow gently 🌬️</p>
          )}
          <button
            onClick={blowOut}
            className="inline-flex items-center gap-2 text-sm text-foreground/60 underline-offset-4 hover:underline"
          >
            <Hand className="h-3 w-3" /> or tap to blow them out
          </button>
        </div>
      )}
      {wishMade && (
        <p className="max-w-md font-script text-2xl text-plum animate-fade-up">
          I hope every wish you whispered tonight finds its way home to you. 💛
        </p>
      )}
    </div>
  );
}
