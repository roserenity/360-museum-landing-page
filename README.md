# Pinoy Hoops Fandom Museum

A single-page landing site for a virtual museum celebrating Filipino basketball fandom. Built with Nuxt 2 + Vuetify.

LINK: https://hoops-landing-page.netlify.app/

> **Note:** This started as client work. All licensed logos, photos, video, fonts, and real people's data were removed and replaced with original SVG artwork and CC0 / public-domain photos (see [CREDITS.md](CREDITS.md)). All names and content are fictional.

## Sections

| Section | What it does |
| --- | --- |
| Hero | Full-screen auto-cycling image carousel with an overlay intro |
| The Pinoy Fandom | Paged photo gallery (Vuetify carousel of image grids) |
| Map Directory | Interactive SVG floor plan: a basketball whose seams are the hallways. You can use it with the mouse or the keyboard, and each wing has an ARIA label |
| Access anytime, anywhere | Split promo panel for the virtual museum |
| Kultura Artists | Artist gallery |
| The Meta Zone | Stacked collectible cards animated with GSAP and driven by a slider |
| 360 Museum | Video player that autoplays once it is fully in view (GSAP ScrollTrigger). The original client video was removed, so only the poster image is shown now |
| Championship Trophy | Feature panel with a glow effect |
| Collector's Page | Collector profiles with their collections |
| Access Pass | Sign-up form with validation, plus social links |


## Tech stack

- **Nuxt 2** (SPA mode, `ssr: false`) with a static build from `nuxt generate`
- **Vuetify 2** for layout and components, with tree-shaking and MDI icons
- **GSAP** + ScrollTrigger for the card-stack animation and the video autoplay
- **@nuxtjs/pwa** for the manifest and service worker
- Original artwork generated in code by `scripts/generate-art.js` (seeded RNG, so the output is reproducible)

## Getting started

Requires Node 18+.

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run generate   # static build in dist/
```

To regenerate the SVG artwork:

```bash
node scripts/generate-art.js . <temp-dir>   # writes into assets/, plus icon.svg into <temp-dir>
```

## Deploying

`dist/` is a plain static site, so any static host works (Netlify, Vercel, GitHub Pages). Use `npm run generate` as the build command and `dist` as the publish directory.

## Credits

Photo sources and licenses are listed in [CREDITS.md](CREDITS.md).
