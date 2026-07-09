# NextStore — Next.js Ecommerce + Login Dashboard

A modern, API-focused Next.js application featuring a product browser and user dashboard. No database required — all data comes from the [DummyJSON API](https://dummyjson.com).

## Features

- **Login Page** — Authenticate via DummyJSON's auth API with demo credentials
- **User Dashboard** — View profile info, cart items, and account stats after login
- **Product Browser** — Search and filter products by category
- **Product Detail** — Full product pages with images, reviews, and pricing
- **Responsive UI** — Tailwind CSS for clean design across all devices

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **DummyJSON API** (products, auth, carts)

## Getting Started

```bash
# Install frontend dependencies
cd frontend
npm install

# Run frontend development server
npm run dev

# Build frontend for production
npm run build

# Start frontend production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend

The Express API lives in `backend/` and runs on port 4000.

```bash
cd backend
npm install
npm start
```

## Demo Login

Use these credentials on the login page:

- **Username:** `emilys`
- **Password:** `emilyspass`

## Project Structure

```
frontend/
├── app/
│   ├── page.js              # Home/landing page
│   ├── layout.js            # Root layout
│   ├── globals.css          # Tailwind imports
│   ├── login/page.js        # Login page with API auth
│   ├── dashboard/page.js    # Protected user dashboard
│   ├── products/
│   │   ├── page.js          # Product listing with search/filter
│   │   └── [id]/page.js     # Product detail page
│   └── components/
│       ├── Navbar.js        # Responsive navigation
│       ├── Footer.js        # Site footer
│       └── ProductCard.js   # Reusable product card
├── package.json
└── Dockerfile

backend/
├── src/
└── Dockerfile
```

## API Endpoints Used

| Feature    | Endpoint                              |
|------------|---------------------------------------|
| Auth       | `POST /auth/login`                    |
| Products   | `GET /products`                       |
| Search     | `GET /products/search?q=...`          |
| Categories | `GET /products/category-list`         |
| By Category| `GET /products/category/:name`        |
| Single     | `GET /products/:id`                   |
| User Cart  | `GET /carts/user/:id`                 |
