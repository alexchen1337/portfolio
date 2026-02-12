# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Framer Motion. The site features a home page, timeline/experience section, projects showcase, and a writings/blog section. It uses styled-jsx for component-scoped styling and is deployed on Vercel with analytics enabled.

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
portfolio/
├── src/app/                    # Next.js App Router pages
│   ├── components/             # Shared components (Header)
│   ├── instagram/              # Instagram page
│   ├── projects/               # Projects showcase page
│   ├── timeline/               # Experience/timeline page
│   ├── writings/               # Blog posts directory
│   │   ├── january-2026-reflection/
│   │   └── my-2025-in-review/
│   ├── layout.tsx              # Root layout with Header and Analytics
│   ├── page.tsx                # Home page (landing with profile)
│   ├── template.tsx            # Page transition animations
│   └── globals.css             # Global styles and CSS variables
├── public/                     # Static assets (images, icons)
│   ├── writings/               # Blog post images
│   └── *.{png,svg,jpg}         # Company logos, icons, profile photo
├── next.config.ts              # Next.js config (React Compiler enabled)
├── tsconfig.json               # TypeScript config (path alias: @/*)
└── package.json                # Dependencies and scripts
```

## Architecture Notes

### Routing
- Uses Next.js App Router (not Pages Router)
- All pages are in `src/app/` directory
- File-based routing: `page.tsx` files define routes
- Path alias `@/*` maps to `src/*`

### Client vs Server Components
- Most components are client components (`'use client'`) due to interactivity
- `page.tsx` (home), Header, and template use client-side state and animations
- Layout uses server components for metadata

### Styling Approach
- Global styles in `globals.css` with CSS custom properties
- Component-scoped styles using `styled-jsx` (see `<style jsx>` blocks)
- Inline styles for component-specific styling
- Responsive design with mobile-first breakpoints (768px, 480px)

### Key Features
- **Page Transitions**: `template.tsx` handles fade-in animations between routes
- **Header**: Conditionally shows social icons only on non-home pages
- **Email Popup**: Reusable email copy-to-clipboard modal in Header and Home
- **Resume Request**: Web3Forms integration with localStorage rate-limiting
- **Animations**: Framer Motion for complex animations, CSS for simple transitions
- **Analytics**: Vercel Analytics integrated in root layout

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` → `src/*`
- React Compiler enabled in `next.config.ts` for automatic optimization

## Working with This Codebase

### Adding New Pages
1. Create a new directory under `src/app/` (e.g., `src/app/new-page/`)
2. Add `page.tsx` inside the directory
3. Use `'use client'` if the page needs interactivity
4. Include `styled-jsx` for component-specific styles
5. Add navigation link to `Header.tsx` if needed

### Adding Blog Posts
1. Create a new directory under `src/app/writings/` (e.g., `src/app/writings/post-name/`)
2. Add `page.tsx` with the post content
3. Add images to `public/writings/post-name/`
4. Update the writings index page to list the new post

### Styling Guidelines
- Use CSS custom properties from `globals.css`: `--background`, `--foreground`, `--muted`
- Follow existing mobile-responsive patterns (check `@media` queries in similar components)
- Use `styled-jsx` for component-scoped styles to avoid global conflicts
- Inline styles are acceptable for dynamic or one-off styling

### Known Warnings
- Metadata viewport warnings during build (Next.js 16 requires `viewport` export instead of `metadata.viewport`)
- These do not affect functionality but should be addressed in a future update
