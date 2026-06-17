# Shopix

A premium e-commerce storefront built with React 19, TypeScript, and Vite. Shopix combines a curated shopping experience with product comparison, member accounts, promo codes, and efficient data fetching through TanStack Query.

---

## Features

### Shopping & Catalog

- **Product catalog** — Browse items from DummyJSON and FakeStore API merged with curated in-house products.
- **Category filtering** — Filter by collection, price, rating, and sort order on the Shop page.
- **Live search** — Navbar search with instant suggestions across product names and categories.
- **Product detail** — Image gallery, color variants, specifications, related products, and SEO metadata.
- **Favorites** — Save items to a persistent wishlist via `localStorage`.
- **Cart** — Add, update quantities, remove items, and view order summary.

### Product Comparison

- Compare **up to 2 products** from the **same category** side by side.
- Comparison bar stays visible while browsing; access the full table at `/compare`.
- Compare specs, prices, ratings, and product-specific key features.
- Selection persists across sessions via `localStorage`.

### Authentication

- **Sign in** (`/login`) and **create account** (`/register`) with email and password validation.
- **My Account** (`/account`) — protected route for profile management, cart summary, and saved items.
- Session and user data stored client-side (`shopix-session`, `shopix-users`).
- Navbar account menu with sign-in link or account dropdown when logged in.

### Promo Codes & Coupons

- Apply promo codes at **Cart** and **Checkout**.
- Supported codes include `WELCOME10`, `CLASSIC15`, `TECH20`, `SAVE25`, and `SHIPFREE`.
- Validation covers minimum order value, category restrictions, percentage/fixed discounts, and free express shipping.
- Active coupon persists in `localStorage` and revalidates when the cart changes.
- Announcement bar highlights current offers site-wide.

### Checkout & Orders

- Multi-step checkout layout: shipping, delivery method, and payment.
- Order summary with tax, shipping, and applied discounts.
- Frontend-only flow — no backend payment processing.

### UX & Interface

- Light/dark theme with persistent preference.
- Toast notifications for cart, favorites, comparison, auth, and coupon actions.
- Motion-powered transitions and micro-interactions.
- Fully responsive layout for mobile, tablet, and desktop.
- SEO hooks with structured data on key pages.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Data fetching | [TanStack React Query v5](https://tanstack.com/query) |
| Animation | Motion v12 |
| Icons | Lucide React |

### Data & State

- **React Query** — Shared cache for products and categories (`useProducts`, `useProduct`, `useCategories`). Five-minute stale time reduces redundant API calls across Home, Shop, Product, Navbar, and Compare.
- **React Context** — Cart, favorites, coupons, comparison, auth, theme, and toasts.
- **localStorage** — Session, users, cart-related prefs, compare list, favorites, and active coupon.
- **External APIs** — [DummyJSON](https://dummyjson.com), [FakeStore API](https://fakestoreapi.com).

---

## Project Structure

```text
src/
├── components/
│   ├── auth/           # AuthLayout, ProtectedRoute
│   ├── layout/         # Navbar, Footer
│   └── ui/             # CompareBar, PromoCodeInput, AnnouncementBar, ScrollToTop
├── context/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── ComparisonContext.tsx
│   ├── CouponContext.tsx
│   ├── FavoritesContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
├── data/
│   └── coupons.ts      # Promo code definitions
├── hooks/
│   ├── useProductQueries.ts
│   └── useSEO.ts
├── lib/
│   ├── api.ts          # Product fetching & enrichment
│   ├── auth.ts         # Auth helpers
│   ├── coupons.ts      # Coupon validation & discount logic
│   ├── queryClient.ts
│   └── queryKeys.ts
├── pages/
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── Product.tsx
│   ├── Compare.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Favorites.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Account.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── types/
│   └── auth.ts
├── App.tsx
├── data.ts             # Curated catalog products
├── main.tsx
└── types.ts
```

---

## Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public |
| `/shop` | Product catalog | Public |
| `/product/:id` | Product detail | Public |
| `/compare` | Product comparison | Public |
| `/favorites` | Wishlist | Public |
| `/cart` | Shopping cart | Public |
| `/checkout` | Checkout | Public |
| `/login` | Sign in | Public |
| `/register` | Create account | Public |
| `/account` | User profile | Protected |
| `/about` | About | Public |
| `/contact` | Contact | Public |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/shopix-ecommerce-website.git
cd shopix-ecommerce-website
npm install
```

### Environment

Copy the example env file if you need to override the API base URL:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview   # optional — preview the production build locally
```

Output is written to `dist/` and can be deployed to Vercel, Netlify, or any static host.

### Type Check

```bash
npm run lint
```

---

## Screenshots

### Home — Hero & Banner
<img src="public/images/Screenshot%202026-06-17%20085100.png" alt="Home hero" width="100%"/>

### Curated Categories
<img src="public/images/Screenshot%202026-06-17%20085129.png" alt="Categories" width="100%"/>

### Best Sellers
<img src="public/images/Screenshot%202026-06-17%20085146.png" alt="Best sellers" width="100%"/>

### Shop — Catalog & Filters
<img src="public/images/Screenshot%202026-06-17%20085827.png" alt="Shop catalog" width="100%"/>

### Live Search
<img src="public/images/Screenshot%202026-06-17%20090043.png" alt="Search overlay" width="100%"/>

### Shopping Cart
<img src="public/images/Screenshot%202026-06-17%20085939.png" alt="Cart" width="100%"/>

---

## License

MIT
