import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, Sparkles } from "lucide-react";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";
import { Slideshow, type Slide } from "@/components/birthday/Slideshow";
import { Celebrate } from "@/components/birthday/Celebrate";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { IntroDoor } from "@/components/birthday/IntroDoor";
import { Candle } from "@/components/birthday/Candle";
import { Constellation, type Memory } from "@/components/birthday/Constellation";
import { Typewriter } from "@/components/birthday/Typewriter";
import { ScratchReveal } from "@/components/birthday/ScratchReveal";
import { CursorSparkles } from "@/components/birthday/CursorSparkles";
import { Fireworks } from "@/components/birthday/Fireworks";

import bakilis1 from "@/assets/bakilis-1.jpeg";
import bakilis2 from "@/assets/bakilis-2.jpeg";
import bakilis3 from "@/assets/bakilis-3.jpeg";
import bakilis4 from "@/assets/bakilis-4.jpeg";
import bakilis5 from "@/assets/bakilis-5.jpeg";
import bakilis6 from "@/assets/bakilis-6.jpeg";
import bakilis7 from "@/assets/bakilis-7.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

// ─────────────────────────────────────────────────────────────
// 💛  EDIT YOUR CONTENT HERE
// ─────────────────────────────────────────────────────────────
const HER_NAME = "Bakilis";
const HERO_SUBTEXT = "The cousin who feels more like a sister — today the whole world gets to celebrate you.";

const SLIDES: Slide[] = [
  { src: bakilis1, caption: "soft, radiant, you" },
  { src: bakilis2, caption: "pretty in pink 💖" },
  { src: bakilis7, caption: "that smile is everything" },
  { src: bakilis4, caption: "elegance personified" },
  { src: bakilis6, caption: "a whole vibe ✨" },
  { src: bakilis3, caption: "art, framed" },
  { src: bakilis5, caption: "queen energy 👑" },
];

const MEMORIES: Memory[] = [
  { src: bakilis1, title: "your smile", note: "the one that makes a whole room exhale." },
  { src: bakilis2, title: "your softness", note: "lace, laughter, and a heart of gold." },
  { src: bakilis7, title: "your light", note: "you walk into rooms and they get warmer." },
  { src: bakilis4, title: "your grace", note: "elegance you didn't have to study — it's just you." },
  { src: bakilis6, title: "your dreams", note: "i'm cheering louder than anyone, cousin." },
  { src: bakilis3, title: "your magic", note: "ordinary days, extraordinary you." },
];

const LETTER_TEXT =
  `Bakilis — my cousin, my sister-in-spirit. Today the world gets to celebrate the girl I've been quietly celebrating my whole life. You're the kind of person who turns family into home, who makes the ordinary glow a little brighter just by being in it. From every shared laugh, every late-night talk, every "remember when" — you've been one of my favorite parts of growing up. So today is for you. For your smile that softens everything, for your dreams (which I'm always rooting for), and for the beautiful year unfolding ahead of you. I love you more than I say out loud. Happy birthday, cousin.`;

const SECRET_MESSAGE = "you're not just my cousin — you're family of the heart. 💛";

const MUSIC_URL =
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3";
// ─────────────────────────────────────────────────────────────

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blush via-background to-blush text-foreground">
      <IntroDoor name={HER_NAME} onOpen={() => setEntered(true)} />
      {entered && <CursorSparkles />}
      <Hero />
      <SlideshowSection />
      <ConstellationSection />
      <LetterSection />
      <ScratchSection />
      <CandleSection />
      <CelebrateSection />
      <FinaleSection />
      <Footer />
      <MusicPlayer src={MUSIC_URL} />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, color-mix(in oklab, var(--rose) 60%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, color-mix(in oklab, var(--lavender) 50%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, color-mix(in oklab, var(--gold) 35%, transparent) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <FloatingHearts count={22} />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose/60 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-plum backdrop-blur animate-fade-up">
          <Heart className="h-3 w-3 fill-plum" /> A digital love letter
        </span>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="block text-foreground/80">Happy Birthday</span>
          <span className="mt-2 block shimmer-text">{HER_NAME} 🎂💖</span>
        </h1>
        <p className="mt-8 max-w-xl font-script text-2xl text-plum/80 md:text-3xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {HERO_SUBTEXT}
        </p>

        <a
          href="#memories"
          className="mt-16 inline-flex flex-col items-center gap-2 text-sm text-foreground/60 transition hover:text-plum animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="uppercase tracking-[0.3em]">Begin the journey</span>
          <ChevronDown className="h-5 w-5 animate-bob" />
        </a>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <p className="font-script text-2xl text-plum/70">{kicker}</p>
      <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function SlideshowSection() {
  return (
    <section id="memories" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader kicker="a little scrapbook" title="Moments with you" />
        <Slideshow slides={SLIDES} />
      </div>
    </section>
  );
}

function ConstellationSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-plum via-[color-mix(in_oklab,var(--plum)_70%,black)] to-plum px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="font-script text-2xl text-rose">written in the stars</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Your constellation
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
            Hover the glowing stars — each one is a little memory I keep of you.
          </p>
        </div>
        <Constellation memories={MEMORIES} />
      </div>
    </section>
  );
}

function LetterSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -y * 6, y: x * 6 });
  };

  return (
    <section className="relative px-6 py-24 md:py-32">
      <FloatingHearts count={8} />
      <div className="relative mx-auto max-w-2xl" ref={wrapRef} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
        <div
          className="relative rounded-3xl bg-cream p-8 shadow-[0_30px_80px_-20px_color-mix(in_oklab,var(--plum)_30%,transparent)] ring-1 ring-rose/40 transition-transform duration-300 ease-out md:p-14"
          style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
          <div className="absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 rounded-sm bg-rose/60 shadow-sm" aria-hidden="true" />
          <p className="font-script text-3xl text-plum md:text-4xl">Dear {HER_NAME},</p>
          <Typewriter
            text={LETTER_TEXT}
            speed={28}
            className="mt-6 min-h-[14rem] text-base leading-relaxed text-foreground/80 md:text-lg"
          />
          <p className="mt-10 text-right font-script text-3xl text-plum">— with all my love 💛</p>
        </div>
      </div>
    </section>
  );
}

function ScratchSection() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeader kicker="a tiny secret" title="Scratch to reveal" />
        <ScratchReveal message={SECRET_MESSAGE} />
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-foreground/50">drag your finger across</p>
      </div>
    </section>
  );
}

function CandleSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--gold) 25%, transparent) 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-3xl">
        <Candle name={HER_NAME} />
      </div>
    </section>
  );
}

function CelebrateSection() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <Celebrate />
    </section>
  );
}

function FinaleSection() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-gradient-to-b from-plum via-[color-mix(in_oklab,var(--plum)_70%,black)] to-black">
      <Fireworks />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <Sparkles className="mb-4 h-8 w-8 text-gold" />
        <p className="font-script text-3xl text-rose">happy birthday, {HER_NAME.toLowerCase()}.</p>
        <h2 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-7xl">
          here's to you — always.
        </h2>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-black px-6 pb-16 pt-12 text-center text-white/80">
      <div className="mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <p className="mt-8 font-script text-2xl text-rose md:text-3xl">
        Made with love by your sibling 💛
      </p>
    </footer>
  );
}
