# 03 — Home page setup

**Branch:** `feature/module-16-user-home-page`
**Requirement:** 3.a Home page setup
**Status:** todo

## Goal

A visitor opens the site and sees a complete, responsive home page built from the Figma
design, with the real product data coming from the API.

## Frontend checklist

### Layout shell (build this once, reuse everywhere)

- [ ] `src/layouts/UserLayout.jsx` — wraps every public page.
- [ ] `src/components/layout/Navbar.jsx` — logo, category links, search box, cart icon
      with a count badge, profile/avatar menu, mobile hamburger.
- [ ] `src/components/layout/Footer.jsx` — links, socials, payment icons, copyright.
- [ ] `src/components/ui/Container.jsx` — one place for max-width + horizontal padding.
- [ ] Mobile menu opens as a drawer; lock body scroll while it is open.

### Home page sections (match the Figma frames top to bottom)

- [ ] `src/components/home/HeroCarousel.jsx` — auto-play, dots, arrows, pause on hover.
- [ ] `src/components/home/CategoryStrip.jsx` — category tiles linking to
      `/category/:slug`.
- [ ] `src/components/home/FeaturedProducts.jsx` — grid of `ProductCard`s.
- [ ] `src/components/home/DealBanner.jsx` — promo banner + countdown (if in the design).
- [ ] `src/components/home/BrandStrip.jsx` — brand logos.
- [ ] `src/components/home/Newsletter.jsx` — email capture with inline validation.
- [ ] `src/pages/user/Home.jsx` — assembles the sections above, in order.

### Product card (used on home, category and search pages)

- [ ] `src/components/product/ProductCard.jsx` — image (`object-cover`, fixed aspect
      ratio to stop layout shift), name, price, discount price, rating, wishlist heart.
- [ ] `src/components/ui/Skeleton.jsx` — grey placeholder while products load.
- [ ] `src/components/ui/EmptyState.jsx` — "Nothing here yet" fallback.
- [ ] Money formatting helper `src/utils/formatCurrency.js` (₹, no decimals).

### Data + routing

- [ ] `src/api/product.api.js` — `getFeatured()`, `getCategories()`.
- [ ] `src/routes/AppRoutes.jsx` — `/` -> `UserLayout` -> `Home`.
- [ ] Use `loading`, `error`, and `empty` states for every request.
- [ ] Later (not now): replace placeholder images with S3 URLs returned by the API.

### Quality

- [ ] Responsive at 360 px, 768 px, 1024 px, 1440 px (check the Figma breakpoints).
- [ ] Images use `loading="lazy"` except the hero.
- [ ] Interactive elements are real `<button>` / `<Link>` (keyboard accessible).
- [ ] `npm run lint` passes.

## Backend checklist (only what the home page needs)

- [ ] `src/models/product.model.js` — name, slug, price, discountPrice, images[],
      category, rating, stock.
- [ ] `src/models/category.model.js` — name, slug, image.
- [ ] `GET /api/v1/products/featured` — latest N featured products.
- [ ] `GET /api/v1/categories` — list for the category strip.
- [ ] Public routes: no auth middleware on these two endpoints.

## Definition of done

- [ ] Home page renders all Figma sections with real API data.
- [ ] No horizontal scroll at any breakpoint.
- [ ] Lighthouse performance ≥ 80 on mobile (images sized + lazy loaded).
- [ ] Loading and error states exist; a failed request does not blank the page.
- [ ] Merged into `develop` with `--no-ff`.

## Commit messages for this branch

```
feat(user-home): add user layout with navbar and footer
feat(user-home): add hero carousel and category strip
feat(user-home): add featured products section with skeletons
feat(user-home): add product card component
feat(products): add featured products and categories endpoints
```
