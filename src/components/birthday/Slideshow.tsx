import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = { src: string; caption: string };

export function Slideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <div
      className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_color-mix(in_oklab,var(--plum)_35%,transparent)] ring-1 ring-rose/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.src}
            alt={s.caption}
            className={`h-full w-full object-cover ${i === index ? "animate-ken-burns" : ""}`}
            key={`${i}-${index === i ? "active" : "idle"}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
            <p className="font-script text-3xl text-white drop-shadow-md md:text-5xl">
              {s.caption}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-plum backdrop-blur transition hover:bg-white md:left-5 md:p-3"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-plum backdrop-blur transition hover:bg-white md:right-5 md:p-3"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
