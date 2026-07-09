import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Discount badge */}
        {product.discountPercentage > 10 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="flex items-center text-sm text-yellow-500">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
