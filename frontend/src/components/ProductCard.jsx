import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAddToCartMutation } from '../app/api/cartApi';

export default function ProductCard({ product }) {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.ImageUrl}
          alt={product.name}
          className="w-full h-52 object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
        />
      </Link>

      <div className="p-4">
        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 truncate hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-400 mt-1 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          <button
            onClick={() => addToCart({ productId: product.id, quantity: 1 })}
            disabled={isLoading || isOutOfStock}
            className="flex items-center gap-1.5 bg-blue-50 text-blue-600 text-sm font-medium
              px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={13} />
            {isLoading ? 'Adding...' : isOutOfStock ? 'Out of stock' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}