import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

export function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.4;
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-white/80 px-4 py-3 text-plum shadow-lg ring-1 ring-rose/50 backdrop-blur-md transition-all hover:scale-105 hover:bg-white md:bottom-8 md:right-8"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        <span className="text-sm font-medium">{playing ? "Pause" : "Play Music 🎵"}</span>
      </button>
    </>
  );
}
