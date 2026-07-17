# Beauti Luuk - Premium Organic Skincare E-Commerce

Welcome to the official repository for **Beauti Luuk**, a premium natural skincare and cosmetics range designed for all skin types and crafted with love in India. 

This modern e-commerce platform is built with **Next.js (App Router)**, **Tailwind CSS**, and **MongoDB** with strict database-first catalog mapping, optimized media assets, and a secure administrative CRUD dashboard.

---

## 🚀 Key Features

* **Dynamic Product Catalog:** Fully dynamic shop grid querying MongoDB directly, featuring advanced client-side filters (by category: Face Wash, Creams & Lotions) and responsive sorting low-to-high.
* **Non-Disruptive Search Experience:** High-performance, debounced product search (across names, ingredients, or barcodes) utilizing silent URL parameter syncs (`replaceState`) to prevent layout height bounciness or text-box focus loss.
* **Tight-Fitting Product Layouts:** Vertical e-commerce bottles are proportionally scaled (`object-contain`) and placed inside dynamic, tight-wrapping visuals frames to remove blank margins.
* **Next.js Media Optimization:** Integrated Next.js `<Image />` component whitelisted with remote `res.cloudinary.com` path patterns, automatically serving compressed WebP versions based on the visitor's screen resolution.
* **WhatsApp support Redirects:** Integrated direct links to business WhatsApp chats for checkout queries and support inquiry forms, formatting and auto-filling the message text instantly.
* **Secure Admin Control Panel:** A dedicated `/admin` control dashboard protecting CRUD operations (list table, add form, edit form, confirm delete modals).
* **Cryptographic Session Guards:** Next.js Edge middleware routing interceptor guarding the dashboard, utilizing zero-dependency JWT-style cookies signed via Web Crypto APIs (`crypto.subtle`).

---

## 🛠️ Tech Stack

* **Frontend:** React 19, Next.js 16 (App Router), Lucide React (Icons), Tailwind CSS (postcss).
* **Database:** MongoDB container, Mongoose ODM (Schemas & Validations).
* **Optimization & Storage:** Cloudinary (Remote CDN assets), Next.js Image optimization server.
* **Auth:** Edge Middleware, Web Crypto subtle signatures (HMAC-SHA256).

---

## ⚙️ Environment Variables

Create a file named `.env.local` in the root directory and add the following variables:

```env
# Local MongoDB Docker Connection URI
MONGODB_URI=mongodb://localhost:27017/beautiluuk

# Secure Admin Dashboard Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=beautiluukadmin2026
JWT_SECRET=beautiluuksecretkey2026jwtencryption
```

---

## ⚡ Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database Seeding
Ensure your local MongoDB instance/Docker container is running, then populate the collection with the master catalog of 6 skincare products:
```bash
npm run seed
```
*(This command wipes old duplicate items and inserts fresh data from `src/data/products.json`)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the shop frontend.

---

## 📂 Project Structure

```
├── public/                # Static logo assets & public documentations
├── scripts/
│   └── seed.js            # Standalone Mongoose catalog database seed script
├── src/
│   ├── app/
│   │   ├── admin/         # Admin login and dashboard routing layouts
│   │   ├── api/           # Backend CRUD routes & authentication APIs
│   │   ├── product/[id]/  # Dynamic product showcase pages
│   │   ├── shop/          # Filtering and catalog index page
│   │   └── layout.js      # Core layout wrapper (Navbar & Footer)
│   ├── components/        # Reusable elements (Navbar, Footer, drawers)
│   ├── data/
│   │   └── products.json  # Master source-of-truth products JSON list
│   ├── lib/
│   │   ├── auth.js        # Edge-compatible JWT signature utility
│   │   └── db.js          # Mongoose database connector
│   ├── models/
│   │   └── Product.js     # Mongoose database schema definitions
│   └── middleware.js      # Admin dashboard authentication guard
```

---

## 🔒 Administrative Credentials

To access the product catalog dashboard, visit:
`/admin/dashboard` (which redirects you to the login screen).

* **Default Username:** `admin`
* **Default Password:** `beautiluukadmin2026`
*(You can update these parameters inside `.env.local` at any time and restart the server)*
