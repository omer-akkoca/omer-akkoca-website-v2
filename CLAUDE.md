# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Personal CV website for Ömer Akkoca. The goal is a CV-style personal site that is discoverable on Google, so SEO matters: content should be rendered on the server / at build time.

Scope:
- **Home page** (`/`): Hero (photo + name/title), Contact (icon + link grid, data in `src/data/contact.ts`), About, Experience, Skills, Soft Skills, Education, and a Books preview whose title row has a "Show all" link on the right.
- **Books page** (`/books`): full list of books read. The data is kept in Firebase.
- Blog and projects were explicitly **dropped** from scope.

## Tech stack

- **Next.js 16** (App Router, Server Components by default). It has breaking changes compared with older versions, so check `node_modules/next/dist/docs/` before using an API (see AGENTS.md).
- **React 19**, **TypeScript** (strict). Path alias `@/*` → `src/*`.
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`, no `tailwind.config`).
- **i18next + react-i18next** for TR/EN translations (client-side, no URL-based locales).
- **dayjs** for all dates.
- **react-icons** for icons (prefer the `react-icons/fa6` set for consistency).
- **motion** (`motion/react`) for animations (e.g. the About section's expand/collapse).
- **ESLint 9** (flat config, `eslint.config.mjs`), **npm**.
- **Firebase** (`firebase/firestore/lite`, server-only) for books data. Planned: deployment on **Vercel**.
- No theme library: theming is Tailwind's `dark` variant plus a tiny React context for the toggle.

## Commands

- `npm run dev`: dev server at http://localhost:3000
- `npm run build`: production build (also runs TypeScript checking)
- `npm start`: serve the production build
- `npm run lint`: ESLint

There is no test framework set up.

## Architecture

```
src/
├─ app/          routes + metadata: layout.tsx, page.tsx (CV), books/page.tsx, sitemap.ts, robots.ts, globals.css
├─ components/   Section (titled section with right-side `action` slot), TextButton, Header, LanguageSwitcher, ThemeToggle,
│                ContactList, About, SkillList (4-column icon + label grid, used by Skills
│                with brand icons from `react-icons/si` / `src/data/skills.ts`, and by Soft Skills with
│                `fa6` icons in `text-primary` / `src/data/softSkills.ts`, labels translated via i18n keys),
│                Education (school / years / field rows, data in `src/data/education.ts`),
│                Experience (client; 42×42 round logo, role + right-aligned date range · duration, company · type,
│                description in `text-description` (same look as About's `text-body`),
│                data in `src/data/experience.ts`, logos in `public/experience/`),
│                BookList (async server component, last 6 books, 6/3/2 columns) + BookCard (385×600 cover, rounded + shadow)
├─ i18n/         locales/{tr,en}.json, config.ts (i18next instance, locales, langInitScript),
│                i18next.d.ts (typed keys), I18nProvider.tsx, useLocale.ts (useT/useLocale), T.tsx (<T k="…" />)
├─ theme/        ThemeProvider.tsx (toggle context), constants.ts (Theme type, media query)
└─ lib/          site.ts (name, description, URL), date.ts (dayjs formatDate),
                 firebase.ts (Firestore lite instance from env), books.ts (Book type, mapBook, getLatestBooks)
```

How it fits together:
- `app/layout.tsx` is the root layout. It injects `langInitScript` in `<head>`, wraps the app in `ThemeProvider` → `I18nProvider`, and renders `Header` (language switcher + theme toggle, top right) above every page.
- Pages are **Server Components**. Translated text is rendered through the client component `<T k="key" />`, so pages stay server-rendered while text follows the selected language. Client components use `useT()` from `src/i18n/useLocale.ts` (`t`, `locale`, `changeLanguage`). **Don't use react-i18next's `useTranslation()` or `i18n.language` directly in components**: they return the already-switched language while later page segments are still hydrating, which causes hydration mismatches. `useT()`/`useLocale()` use `useSyncExternalStore` with a Turkish server snapshot to avoid that.
- `lib/site.ts` is the single source for the site name, description and base URL (`NEXT_PUBLIC_SITE_URL`, see `.env.example`; it falls back to `http://localhost:3000`). It feeds `metadataBase`, `sitemap.ts` and `robots.ts`.
- Every text button/link (e.g. About's "Read more", Books' "Show all") uses `components/TextButton.tsx`: required `label`, optional `icon` (shown on the right), `href` renders a `next/link`, otherwise a `<button>` with `onClick`. It has no hooks, so it works in Server and Client Components.
- Books come from the Firestore collection `books-read` (fields: `title`, `author`, `image` [Firebase Storage URL], `description`, `started_at` Timestamp, `ended_at` Timestamp or the string `"forever"` for books read continuously). `lib/books.ts` maps them in a single `mapBook()` (non-Timestamp dates become `undefined`) and fetches with `"use cache"` + `cacheLife("hours")` (the project uses `cacheComponents`, so no `revalidate` export). Sort by `started_at`, not `ended_at` (mixed types). Covers are served via `next/image`; `next.config.ts` allows `firebasestorage.googleapis.com/v0/b/omer-akkoca.appspot.com/o/**`.
- Firebase config lives in **server-only env vars** `FIREBASE_*` (no `NEXT_PUBLIC_`), in `.env.local` (gitignored) and in Vercel settings; see `.env.example`.
- On the home page, Hero holds the only `h1`. The other sections use `components/Section.tsx` (`h2` + optional right-aligned `action`; Books uses it for the "Show all" link to `/books`).

## Conventions

### Styling
- **All styling uses Tailwind classes, and all colors come from Tailwind theme tokens.** Components never use custom CSS rules, inline `style`, or hex values.
- Color tokens are defined once in `src/app/globals.css`:

  | Token | Light | Dark |
  |---|---|---|
  | `background` | `#ffffff` | `#111111` |
  | `primary` | `#d16334` | `#d16334` |
  | `text` (all text) | `#111111` | `#f5f5f5` |
  | `subtext` (secondary text) | `#6d6d6d` | `#a3a3a3` |
  | `muted` (e.g. Education field) | `#555555` | `#c4c4c4` |

  Use them as `bg-background`, `text-text`, `text-subtext`, `text-muted`, `text-primary`.
  Technology logos in Skills use `--color-brand-*` tokens (e.g. `text-brand-react`), also defined in `globals.css`; black-by-brand logos (Expo, Next.js) use `text-text`. The dark values are applied to the same variables through Tailwind's `dark` variant (`@variant dark` on `:root`), so components don't need `dark:` color variants.
- **Font:** all text uses Inter Regular (`next/font/google` in `layout.tsx`, exposed as `--font-sans: var(--font-inter), sans-serif`). Don't add font weights unless the design asks for them.
- **Font sizes are responsive, never fixed px.** Define them as `--text-*` tokens in `globals.css` (`@theme`) with rem-based `clamp()` (e.g. `--text-name` 17→19px, `--text-title` 13→15px) and use them as `text-name`, `text-title`. Each use gets its own token even when values match (e.g. `--text-description` mirrors `--text-body`).

### Theme (light/dark), handled by Tailwind
- The `dark` variant is a custom variant in `globals.css`. It is active when the device prefers dark (`@media (prefers-color-scheme: dark)`) unless `<html data-theme="light">`, or when `<html data-theme="dark">`.
- The **initial theme comes from Tailwind/CSS alone** (no JS): every visit starts with the device theme, or light if it can't be read.
- The toggle (`ThemeProvider.setTheme`) only sets `data-theme` on `<html>` and keeps the choice in memory. The theme choice is intentionally **not persisted**. The provider reads `matchMedia` only to know which icon to show.

### i18n (TR/EN), handled by i18next
- The language is switched in-page with `i18n.changeLanguage`, **not via URLs**. The default is `tr`. The choice is persisted in `localStorage.lang` (by `I18nProvider`'s `languageChanged` handler) and restored on the next visit.
- Translations live in `src/i18n/locales/tr.json` / `en.json`. `tr.json` is the source of truth for keys; `en.json` must provide every key (enforced with `satisfies` in `config.ts`). Keys are type-checked via `i18next.d.ts`. Never hardcode user-visible text in components.
- The i18next instance always initializes in Turkish (synchronously, `initAsync: false`), so server HTML and the first client render match. Server HTML and metadata are therefore always Turkish, which is what search engines index. `I18nProvider` switches to the saved language after hydration.

### Flash prevention
`langInitScript` (`src/i18n/config.ts`) runs in `<head>` before first paint. For a saved English locale it sets `data-lang-pending`, which hides `<body>` (`[[data-lang-pending]_&]:invisible`) until `I18nProvider` has switched the language and re-rendered. The theme needs no script because it is pure CSS.

### Dates
Always format dates with **dayjs** through `formatDate(date, locale, format?)` in `src/lib/date.ts`, passing the current language from `useT().locale`. Don't use `Date.toLocale*`, `Intl.DateTimeFormat`, or the global `dayjs.locale()`.

### SEO
- `app/layout.tsx` sets `metadataBase`, the title template (`%s | Ömer Akkoca`) and default description. Every page exports its own `metadata` with `alternates.canonical`.
- Every new route must be added to `src/app/sitemap.ts`.
- Use semantic HTML (one `h1` per page, `section`/`h2` for sections).

## Status / roadmap

Done: home page Books preview (last 6 from Firestore), skeleton pages (sections show titles only, `/books` shows an empty state), color tokens, light/dark theme (Tailwind), TR/EN switching (i18next), sitemap/robots, dayjs helper.

Next:
- Section contents (planned as typed data in `src/data/cv.ts`) and the profile photo.
- Full `/books` page list (reuse `mapBook()` from `lib/books.ts`).
- Set `NEXT_PUBLIC_SITE_URL` to the real domain before deploying.
