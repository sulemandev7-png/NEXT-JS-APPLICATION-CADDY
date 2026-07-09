import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

// Fetch products from DummyJSON API (server component)
async function getProducts(searchQuery, category) {
  try {
    let url = "https://dummyjson.com/products?limit=12";

    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=12`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=12`;
    }

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return { products: [], total: 0 };
    return res.json();
  } catch {
    return { products: [], total: 0 };
  }
}

// Fetch available categories
async function getCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/category-list", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "";

  // Fetch products and categories in parallel
  const [productsData, categories] = await Promise.all([
    getProducts(search, category),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">
            Browse our collection powered by DummyJSON API
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <form className="flex-1" action="/products" method="GET">
            <div className="relative">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <svg
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          {/* Category filter */}
          <form action="/products" method="GET">
            <select
              name="category"
              defaultValue={category}
              onChange="this.form.submit()"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Categories</option>
              {(categories || []).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <noscript>
              <button type="submit" className="ml-2 px-3 py-2 bg-indigo-600 text-white rounded">
                Filter
              </button>
            </noscript>
          </form>
        </div>

        {/* Results info */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {productsData.products?.length || 0} of {productsData.total}{" "}
          products
          {search && (
            <span>
              {" "}
              for &quot;<strong>{search}</strong>&quot;
            </span>
          )}
          {category && (
            <span>
              {" "}
              in <strong>{category}</strong>
            </span>
          )}
        </p>

        {/* Product Grid */}
        {productsData.products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No products found.</p>
            <a
              href="/products"
              className="text-indigo-600 hover:underline mt-2 inline-block"
            >
              Clear filters
            </a>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
