# 🛍️ Shopix - Premium E-Commerce Platform

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.0-black.svg?logo=framer)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Shopix is a premium, modern, and fully interactive e-commerce web application. Built using **React 19**, **TypeScript**, and **Vite**, it leverages **Tailwind CSS v4** for clean, utility-first styling and **Motion** (Framer Motion) for beautiful, fluid micro-interactions and page transitions.

---

## ✨ Key Features

- **🌓 Dynamic Light/Dark Mode:** Seamless theme switching with persistent user preference.
- **🛒 Complete Cart Management:** Add to cart, adjust quantities, calculate totals dynamically, and clear cart.
- **❤️ Favorites / Wishlist:** Bookmark favorite items with persistent local storage.
- **🔍 Advanced Search & Filters:** Filter products by category, price range, sorting criteria, and direct text search on the Shop page.
- **✨ Animated Micro-Interactions:** Smooth page transitions, hover effects, and interactive UI states powered by Motion.
- **🔔 Custom Toast System:** Real-time feedback alerts for user actions (e.g., adding to cart, wishlist, checkout status).
- **📋 Structured Checkout Flow:** Interactive multi-step checkout simulation with shipping details and order verification.
- **📱 Fully Responsive Design:** Optimised for desktop, tablet, and mobile screens.

---

## 📸 Screenshots

### 🏠 Home Page - Hero & Banner
Detailed view of the premium homepage introduction and hero slide.
<img src="public/images/Screenshot%202026-06-17%20085100.png" alt="Home Hero Banner" width="100%"/>

---

### 📂 Curated Categories Section
Browse curated collections and product categories seamlessly.
<img src="public/images/Screenshot%202026-06-17%20085129.png" alt="Categories" width="100%"/>

---

### 🌟 Featured Best Sellers
Carousel of our highest-rated and top-selling products.
<img src="public/images/Screenshot%202026-06-17%20085146.png" alt="Best Sellers" width="100%"/>

---

### 🔍 Explore the Collection (Product Catalog)
Dynamic filtering sidebar with responsive sorting options and search.
<img src="public/images/Screenshot%202026-06-17%20085827.png" alt="Shop Catalog and Filters" width="100%"/>

---

### ⚡ Interactive Search Overlay
Fast predictive search dropdown showing matches as you type.
<img src="public/images/Screenshot%202026-06-17%20090043.png" alt="Interactive Live Search" width="100%"/>

---

### 🛒 Detailed Shopping Cart
Full overview of items in the cart, item counter, quantity controls, and pricing summary sidebar.
<img src="public/images/Screenshot%202026-06-17%20085939.png" alt="Shopping Cart Page" width="100%"/>

---

## 🛠️ Tech Stack & Libraries

- **Frontend Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Animations:** [Motion (Framer Motion v12)](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
Shopix-ecommerce website/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI & Layout components
│   │   ├── layout/         # Navbar, Footer
│   │   └── ui/             # ScrollToTop, etc.
│   ├── context/            # React Contexts (Cart, Favorites, Theme, Toast)
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components (Home, Shop, Product, Cart, etc.)
│   ├── lib/                # Utility classes & helpers
│   ├── App.tsx             # Main routing and wrapper layout
│   ├── data.ts             # Static mock products and categories data
│   ├── index.css           # Global styles and Tailwind imports
│   ├── main.tsx            # Application entry point
│   └── types.ts            # Shared TypeScript declarations
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (recommended version `18.x` or higher).

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/shopix-ecommerce-website.git
   cd shopix-ecommerce-website
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Duplicate the example file and customize it if needed:
   ```bash
   cp .env.example .env.local
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 📦 Build & Deployment

To build the project for production:

```bash
npm run build
```

The production assets will be generated in the `dist/` directory, ready to be hosted on Vercel, Netlify, or any static hosting platform.


