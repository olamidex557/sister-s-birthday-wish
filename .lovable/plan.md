## Birthday site for Bakilis

A single-page, emotional birthday website that feels like a digital scrapbook — soft blush & lavender palette, Lora + Nunito Sans typography, gentle animations, and personal touches throughout.

### Design direction

- **Palette**: Blush pink `#f8e8ee` background, deeper rose `#e8c5d0`, lavender accent `#c9a0dc`, deep purple `#9b72cf` for emphasis. Soft gold sparkle accents for a hint of magic.
- **Typography**: Lora (storybook serif) for headings, Nunito Sans for body. Adds a "Dancing Script" handwritten font for the signature/letter signoff to give that handwritten feel.
- **Motion**: Smooth fades, gentle Ken Burns zoom on slideshow, floating hearts in the background, hover lift on cards, soft scroll reveals.
- **Layout**: Generous whitespace, rounded-3xl cards, soft pink shadows, fully mobile-first.

### Page sections (top to bottom)

1. **Hero** — Full-screen blush gradient with floating hearts/sparkles drifting upward. Big serif headline "Happy Birthday Bakilis 🎂💖" with a gentle fade-in and subtle letter-by-letter shimmer. Subtext: "You make life brighter every day." Animated "Scroll down ↓" indicator.

2. **Photo slideshow** — Auto-playing carousel (6 placeholder images, easy to swap). Cross-fade transitions, slow Ken Burns zoom on the active slide, captions overlaid ("My favorite memory", "You always shine", etc.), prev/next arrows, and clickable dots. Pauses on hover.

3. **Birthday letter** — Centered "paper" card with soft shadow and a slight rotation for a scrapbook feel. Heartfelt sample letter to Bakilis (3 short paragraphs about how much she means to you) signed in handwritten script.

4. **Celebrate button** — Big pill button "Celebrate 🎉" that triggers a burst of confetti + floating balloons rising up the screen. Can be clicked repeatedly.

5. **Music toggle** — Floating round button (bottom-right, persistent) with a music note icon. Tap to play/pause a soft background track. Starts muted by default to respect browser autoplay rules.

6. **Footer** — "Made with love by your sibling 💛" in handwritten script, centered on a soft gradient.

### Interactions

- Smooth scroll between sections
- Reveal-on-scroll fades for each section
- Hover lift on the letter card and slideshow
- Confetti uses a lightweight canvas burst (no heavy library)
- Background ambient floating hearts loop subtly throughout

### Editing notes for you

- All text (name, message, letter, captions) lives at the top of one component file with clear comments — easy to edit.
- Photos are an array of image URLs + captions; replace the URLs with your own.
- Music URL is a single constant; swap to any MP3 link.

### Technical details

- Built as a single TanStack Start route (`src/routes/index.tsx`) with small subcomponents for Hero, Slideshow, Letter, Celebrate, MusicPlayer, Footer.
- Tailwind v4 with new design tokens added to `src/styles.css` (blush, rose, lavender, plum, gold) and the Lora / Nunito Sans / Dancing Script Google Fonts loaded via the root route head.
- Confetti and floating hearts implemented with a small custom canvas effect — no extra dependencies.
- Placeholder images from Unsplash so the page looks great immediately; you can swap URLs anytime.
- Fully responsive: hero text scales, slideshow becomes touch-swipeable on mobile, letter card adapts padding.
