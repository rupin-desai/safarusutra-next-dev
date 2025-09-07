# Safari Sutra — Next.js (app) — Developer Preview

A modern, responsive travel site built with Next.js (app router), TypeScript and Tailwind CSS. This repo is a development-stage version of the Safari Sutra site and includes tour pages, destination pages, contact email templates, reusable UI primitives and utilities aimed at fast iteration and good SEO.

---

## Highlights

- Next.js (app directory) — Next 15.5.2, React 19.1.0
- TypeScript-first codebase (typescript ^5)
- Tailwind CSS v4 for utility-first styling
- Animations with Framer Motion
- Mobile-first, accessible components (Hero, Tour cards, Reviews, Footer, Sidebar)
- SEO-friendly: server metadata generators and JSON-LD (itineraries, canonical links)
- Email templates included under public/htmls (Contact, hireB2b)
- Client tracking hooks (mixpanel-browser) and email via @emailjs/browser
- Swiper for carousels and responsive sliders

---

## Built with

- Next.js 15 (app router)
- React 19
- TypeScript
- TailwindCSS v4
- Framer Motion
- Swiper
- Lucide React (icons)
- Mixpanel / EmailJS client libs
- ESLint (eslint-config-next)

---

## Quick Start

Prerequisites
- Node.js (LTS recommended) and npm or pnpm
- Git

Clone and install
```bash
git clone <repo-url>
cd safarusutra-next-dev
npm install
```

Run locally (development)
```bash
npm run dev
# Runs: next dev --turbopack
```

Build and preview
```bash
npm run build
npm run start
```

Lint
```bash
npm run lint
```

---

## Recommended Environment Variables

Add a .env.local to the project root for any secret/public keys used by the client or server. Example keys used in this repo:

- NEXT_PUBLIC_SITE_URL=https://your-site.example
- NEXT_PUBLIC_MIXPANEL_TOKEN=<your-mixpanel-token>
- NEXT_PUBLIC_EMAILJS_SERVICE_ID=<emailjs-service-id>
- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<emailjs-template-id>
- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<emailjs-public-key>

Note: Inspect code (email send handlers / mixpanel init) to confirm exact names.

---

## Project Structure (high level)

- src/
    - app/                     — Next app routes (about, tour/[slug], ...), layout & metadata
    - components/
        - Common/                 — Footer, shared components
        - UI/                     — HeroSection, TitlePill, SectionTitle, TourCard, etc.
        - Pages/                  — Page-specific component groups (AboutPage, TourDetailsPage, HomePage)
        - utils/                  — BreadcrumbDetails and other helpers
    - styles/ or globals.css    — Tailwind imports and site-wide CSS
- public/
    - htmls/                   — Email templates (Contact.html, hireB2b.html)
- package.json               — scripts & deps
- README.md

Notable components/utilities:
- HeroSection — page hero with custom breadcrumbs & animation
- BreadcrumbDetails — intelligent breadcrumb generator for dynamic routes
- TitlePill / SectionTitle — reusable heading primitives
- TourOverview / TourItinerary / TourSidebar — tour detail building blocks
- JSON-LD injection for itinerary structured data (TourOverview, TourItinerary)

---

## Styling & UI notes

- Tailwind v4 configured; prefer utility classes and small component-level CSS.
- Fonts: Geist / Geist_Mono loaded via next/font in root layout.
- Accessibility: buttons and links include ARIA labels where relevant. Review interactive components for keyboard behaviour.

---

## SEO, Metadata & Structured Data

- Routes use server-side metadata generators (generateMetadata) to provide title, description, OG and Twitter tags.
- Some pages inject JSON-LD (e.g., itinerary) for rich results.
- Canonical links are added in TourOverview and other pages to avoid duplicate content.

---

## Email Templates

Prebuilt HTML email templates live in public/htmls:
- Contact.html — "Thank you" / message details email
- hireB2b.html — B2B lead notification

They are designed to be Gmail-compatible (inline styles / table layout). Use these with EmailJS or your mail sending service.

---

## Testing & Debugging tips

- Use browser devtools to inspect canonical tags and JSON-LD script nodes.
- For animation/debugging, temporarily reduce motion or set Framer Motion to reduced-motion mode.
- Swiper debug: ensure "swiper/css" and pagination CSS are imported where Swiper is used.

---

## Deployment

This project targets standard Next.js hosting platforms (Vercel recommended). Keep the following in mind:
- Set environment variables in the host provider (Mixpanel, EmailJS keys, site URL).
- Enable modern image CDN/optimization if using Next Image.
- If deploying behind a custom domain, set NEXT_PUBLIC_SITE_URL and verify canonical generation.

---

## Contributing

1. Fork the repo
2. Create a feature branch: git checkout -b feat/your-feature
3. Implement & test locally
4. Run linting and type checks
5. Submit a pull request with a clear description

Please follow the existing code style (TypeScript + Tailwind + small components). Open an issue for larger changes or architecture discussions.

---

## Tips for Developers

- BreadcrumbDetails contains special handlers for dynamic routes (tour, fixeddepartures, blog). Extend it to support new route patterns.
- Reuse TitlePill and SectionTitle for consistent headings across pages.
- Email templates can be localized / parameterized using simple templating before sending (replace placeholders like {{from_name}}).
- Use the metadata generators in app routes to keep SEO predictable and server-rendered.

---

## License

MIT — feel free to use and adapt. (Replace with your preferred license if needed.)

---

## Contact

For quick questions: hello@safarisutra.com (placeholder in templates). Update as required for your environment.

---

If you want, I can:
- Add a short "developer checklist" for new contributors
- Generate a recommended .env.example
- Produce a one-page component map (which component is used where)

Tell me which you'd like next.