import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Heart } from "lucide-react";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";
import { Slideshow, type Slide } from "@/components/birthday/Slideshow";
import { Celebrate } from "@/components/birthday/Celebrate";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";

export const Route = createFileRoute("/")({
  component: Index,
});

// ─────────────────────────────────────────────────────────────
// 💛  EDIT YOUR CONTENT HERE
// ─────────────────────────────────────────────────────────────
const HER_NAME = "Bakilis";
const HERO_SUBTEXT = "You make life brighter every single day.";

const SLIDES: Slide[] = [
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80", caption: "My favorite memory" },
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1600&q=80", caption: "You always shine" },
  { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1600&q=80", caption: "Forever cheering for you" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80", caption: "Sweetest soul I know" },
  { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1600&q=80", caption: "Magic follows you" },
  { src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=1600&q=80", caption: "Here's to you ✨" },
];

const LETTER_PARAGRAPHS = [
  `Bakilis — today the world gets to celebrate the person I've already been celebrating my whole life. Watching you grow into who you are has been one of my greatest joys.`,
  `You're the kind of person who makes ordinary days feel a little softer, a little funnier, a little more like home. Your kindness shows up in the small ways no one else notices, and your strength shows up exactly when it matters.`,
  `So today is for you. For your laugh, your heart, your dreams, and every beautiful thing still coming your way. I love you more than words, and I'm endlessly proud to be your sibling.`,
];

// Soft public-domain piano lullaby — replace with any MP3 URL you like.
const MUSIC_URL =
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3";
// ─────────────────────────────────────────────────────────────

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blush via-background to-blush text-foreground">
      <Hero />
      <SlideshowSection />
      <LetterSection />
      <CelebrateSection />
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
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose/60 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-plum backdrop-blur animate-fade-up">
          <Heart className="h-3 w-3 fill-plum" /> A little gift for you
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
          <span className="uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bob" />
        </a>
      </div>
    </section>
  );
}

function SlideshowSection() {
  return (
    <section id="memories" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="font-script text-2xl text-plum/70">a little scrapbook</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Moments with you
          </h2>
        </div>
        <Slideshow slides={SLIDES} />
      </div>
    </section>
  );
}

function LetterSection() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <FloatingHearts count={8} />
      <div className="relative mx-auto max-w-2xl">
        <div
          className="relative rounded-3xl bg-cream p-8 shadow-[0_30px_80px_-20px_color-mix(in_oklab,var(--plum)_25%,transparent)] ring-1 ring-rose/40 md:p-14"
          style={{ transform: "rotate(-0.6deg)" }}
        >
          <div className="absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 rounded-sm bg-rose/60 shadow-sm" aria-hidden="true" />
          <p className="font-script text-3xl text-plum md:text-4xl">Dear {HER_NAME},</p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/80 md:text-lg">
            {LETTER_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-10 text-right font-script text-3xl text-plum">— with all my love 💛</p>
        </div>
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

function Footer() {
  return (
    <footer className="relative px-6 pb-16 pt-12 text-center">
      <div className="mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-plum/40 to-transparent" />
      <p className="mt-8 font-script text-2xl text-plum md:text-3xl">
        Made with love by your sibling 💛
      </p>
    </footer>
  );
}
