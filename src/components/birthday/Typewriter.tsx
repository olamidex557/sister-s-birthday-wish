import { useEffect, useRef, useState } from "react";

export function Typewriter({ text, speed = 35, className }: { text: string; speed?: number; className?: string }) {
  const [i, setI] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStart(true)),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    if (i >= text.length) return;
    const t = setTimeout(() => setI((x) => x + 1), speed);
    return () => clearTimeout(t);
  }, [i, start, text, speed]);

  return (
    <div ref={ref} className={className}>
      {text.slice(0, i)}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-plum align-middle" style={{ height: "1em" }} />
    </div>
  );
}
