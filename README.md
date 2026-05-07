# ✦ Upasana Prabhakar — Portfolio Website

> A cinematic, space-themed developer portfolio built with Next.js, Three.js, and GSAP — featuring a live 3D horizon scene, scroll-driven camera animation, and production-grade content.

&nbsp;

## ✦ Live Demo

**[upasanaprabhakar.vercel.app](https://portfolio-website-dwae.vercel.app/)** &nbsp;·&nbsp; *Best experienced on desktop*



## ✦ Preview

<img width="1919" height="908" alt="Screenshot 2026-05-07 180230" src="https://github.com/user-attachments/assets/a49b0132-b63c-4171-b28b-5ab3ffd7b5e0" />


&nbsp;

## ✦ Features

**3D Canvas (Three.js)**
- Fixed horizon scene with 4-layer parallax mountains and procedural silhouettes
- 15,000 star particles across 3 depth layers with per-layer rotation speed
- Animated nebula shader with color bleeding and elevation distortion
- Atmospheric glow sphere with pulsing bloom
- Shooting stars — procedurally spawned, trail-faded, fully cleaned up
- Scroll-driven camera interpolation across 3 waypoints (Horizon → Cosmos → Infinity)
- Mouse parallax — live camera tilt as cursor moves across the hero, fades on scroll
- UnrealBloomPass post-processing with tuned strength, radius, and threshold

**UI / UX**
- Custom glowing cursor with a lagging ring that trails at 12% lerp speed
- Right-side navigation dots with section labels — click to jump
- Scroll progress bar with section counter
- GSAP character-split hero entrance animation
- Per-section reveal animations (scroll-triggered slide-up)
- Glassmorphism project, skill, and cert cards with accent-colored inner glow
- Spiral intro overlay with fade-out transition

**Content**
- About section with two-column layout, stat callouts, and experience card
- Skills grid across 6 categories
- 3 featured projects with tech chips, bullet points, and live links
- 4 certifications with verified LinkedIn credential links
- Contact beacon with glowing CTA button

&nbsp;

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| 3D Engine | Three.js r155+ |
| Animation | GSAP 3 + ScrollTrigger |
| Post-Processing | three/examples — EffectComposer, UnrealBloomPass |
| Styling | CSS Modules / Global CSS |
| Fonts | Clash Display, Syne, JetBrains Mono |
| Deployment | Vercel |

&nbsp;

## ✦ Project Structure

```
src/
│
├── app/
│   ├── page.tsx               # Root page
│   ├── globals.css            # All styles
│   └── layout.tsx             # Fonts & metadata
│
├── components/
│   ├── Portfolio.tsx          # Three.js scene + all sections
│   └── SpiralAnimation.tsx    # Intro overlay
│
public/
│   └── preview.png            # OG image
```

&nbsp;

## ✦ Getting Started

**Prerequisites:** Node.js 18+, npm or yarn

```bash
# 1. Clone the repo
git clone https://github.com/upasanaprabhakar/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

&nbsp;

## ✦ Key Implementation Details

- **Scroll-driven camera** — As you scroll, the 3D camera smoothly travels between three positions in space — from the horizon, through the cosmos, into deep infinity. The movement is eased each frame so it never feels abrupt.

- **Mouse parallax** — Moving your cursor gently tilts the entire scene — stars, mountains, and camera all shift slightly. This effect fades away naturally as you scroll down, so it only lives in the hero.

- **Shooting stars** — Stars spawn randomly, streak across the sky with a glowing trail, then fade out and disappear. Each one is fully removed from memory after it finishes so nothing builds up over time.

- **Glassmorphism cards** — Project and cert cards use a frosted-glass effect with a blurred dark background. Each card picks up the accent color of its content for its border glow, making every card feel distinct.

- **Custom cursor** — A small glowing dot follows your mouse instantly. A larger ring chases it with a slight delay, giving the cursor a smooth, fluid feel that matches the space aesthetic.

&nbsp;

## ✦ Customization

To adapt this for your own portfolio, update the data arrays at the top of `Portfolio.tsx`:

```ts
const PROJECTS = [ ... ]   // your projects
const SKILLS   = [ ... ]   // your skill categories
const CERTS    = [ ... ]   // your certifications + LinkedIn links
```

Colors and typography live in `globals.css` under the clearly labeled section comments.

&nbsp;

## ✦ About Me

**Upasana Prabhakar** — Full-Stack Developer & AI Systems Builder

B.Tech CSE · Rayat Bahra University · CGPA 8.6 · Graduating 2027

Top 7 · HackFest 2 · GDG Cloud New Delhi · 500+ participants

[upasanaprabhakar35@gmail.com](mailto:upasanaprabhakar35@gmail.com) &nbsp;·&nbsp;
[github.com/upasanaprabhakar](https://github.com/upasanaprabhakar) &nbsp;·&nbsp;
[linkedin.com/in/upasana-prabhakar-634224296](https://linkedin.com/in/upasana-prabhakar-634224296)

&nbsp;

## ✦ License

MIT — feel free to fork and adapt. A credit or star is appreciated but not required.

&nbsp;

*Built in deep space. Deployed on Vercel. &nbsp;✦*
