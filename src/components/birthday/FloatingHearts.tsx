import { useEffect, useState } from "react";

const HEARTS = ["💖", "💗", "💕", "✨", "🌸", "💜", "⭐"];

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<
    { id: number; left: number; delay: number; duration: number; size: number; drift: number; emoji: string }[]
  >([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: 14 + Math.random() * 22,
        drift: (Math.random() - 0.5) * 120,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-40px] select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
            // @ts-expect-error custom property
            "--drift": `${h.drift}px`,
            opacity: 0,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
