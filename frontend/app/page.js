import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";

// Fetch featured products for the homepage
async function getFeaturedProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=8&skip=0", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { products: [], total: 0 };
    return res.json();
  } catch {
    return { products: [], total: 0 };
  }
}

export default async function HomePage() {
  const productsData = await getFeaturedProducts();
  const featuredProducts = productsData?.products || [];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Amazing
              <br />
              <span className="text-yellow-300">Products</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
              A modern ecommerce experience built with Next.js. Browse products,
              sign in, and explore your dashboard — all powered by APIs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse Products
              </Link>
              <Link
                href="/login"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="API-Powered"
              description="All data is fetched from DummyJSON API — no database needed. Perfect for learning API integration."
            />
            <FeatureCard
              icon="🎨"
              title="Modern UI"
              description="Built with Tailwind CSS for a responsive, beautiful interface that works on any device."
            />
            <FeatureCard
              icon="🔐"
              title="Mock Authentication"
              description="Full login flow with API-based auth. Sign in and see your personalized dashboard."
            />
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured Products
                </h2>
                <p className="text-gray-500 mt-1">
                  Top picks from our catalog
                </p>
              </div>
              <Link
                href="/products"
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                View all
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Explore?</h2>
            <p className="text-gray-400 mt-3 text-lg">
              Sign in with the demo account to see the full dashboard experience.
            </p>
            <Link
              href="/login"
              className="inline-block mt-6 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
      <span className="text-4xl">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}
