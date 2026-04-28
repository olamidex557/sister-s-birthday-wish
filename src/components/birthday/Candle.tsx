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
        {wishMade ? "Wish granted ✨" : "Blow out the candle"}
      </h2>

      <div className="relative h-72 w-56">
        {/* cake */}
        <div className="absolute bottom-0 left-1/2 h-32 w-48 -translate-x-1/2 rounded-3xl bg-gradient-to-b from-rose to-[color-mix(in_oklab,var(--rose)_60%,var(--plum))] shadow-[0_20px_50px_-10px_rgba(85,30,90,0.4)]">
          <div className="absolute inset-x-2 top-3 h-2 rounded-full bg-cream/80" />
          <div className="absolute inset-x-4 top-7 flex justify-around">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="text-base">🍓</span>
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-script text-sm text-white/90">
            Happy B-day {name}
          </div>
        </div>
        {/* candle */}
        <div className="absolute bottom-32 left-1/2 h-20 w-3 -translate-x-1/2 rounded-sm bg-gradient-to-b from-cream to-rose shadow-md" />
        {/* wick */}
        <div className="absolute bottom-[208px] left-1/2 h-2 w-px -translate-x-1/2 bg-foreground" />
        {/* flame */}
        {lit && (
          <>
            <div
              className="absolute bottom-[210px] left-1/2 h-10 w-5 -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 80%, #fff7d1 0%, #ffd166 40%, #ff8e3c 70%, transparent 100%)",
                animation: "flame 0.18s ease-in-out infinite alternate",
                filter: "blur(0.5px)",
                transformOrigin: "50% 100%",
              }}
            />
            <div
              className="absolute bottom-[210px] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-70"
              style={{
                background: "radial-gradient(circle, rgba(255,209,102,0.5) 0%, transparent 60%)",
                animation: "glow 2s ease-in-out infinite",
              }}
            />
          </>
        )}
        {/* smoke after blow */}
        {!lit && (
          <div className="absolute bottom-[210px] left-1/2 -translate-x-1/2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute h-3 w-3 rounded-full bg-foreground/30"
                style={{ animation: `smoke 2s ease-out ${i * 0.3}s forwards` }}
              />
            ))}
          </div>
        )}
      </div>

      {!wishMade && (
        <div className="flex flex-col items-center gap-3">
          {!listening ? (
            <button
              onClick={startMic}
              className="inline-flex items-center gap-2 rounded-full bg-plum/90 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-plum"
            >
              <Mic className="h-4 w-4" /> Use mic to blow it out
            </button>
          ) : (
            <p className="text-sm text-plum animate-pulse">Listening… blow gently 🌬️</p>
          )}
          <button
            onClick={blowOut}
            className="inline-flex items-center gap-2 text-sm text-foreground/60 underline-offset-4 hover:underline"
          >
            <Hand className="h-3 w-3" /> or tap to blow it out
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
