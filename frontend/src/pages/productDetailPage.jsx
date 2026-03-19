import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useGetProductByIdQuery } from '../app/api/productsApi';
import { useAddToCartMutation } from '../app/api/cartApi';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [addToCart, { isLoading: adding }] = useAddToCartMutation();

  const handleAdd = async () => {
    await addToCart({ productId: product.id, quantity: qty });
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-24">
        <p className="text-red-500 font-medium">Product not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Back to products
        </button>
      </div>
    );
  }

  const isOutOfStock = product.Stock === 0;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-400
          hover:text-gray-700 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl p-8
        grid grid-cols-1 md:grid-cols-2 gap-10">

  
        <img
          src={product.ImageUrl}
          alt={product.name}
          className="w-full h-80 object-cover rounded-xl"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
        />

  
        <div className="flex flex-col justify-center">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
            {console.log(product)}
          </span>

          <h1 className="text-2xl font-bold text-gray-100 mt-2">
            {product.name}
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed mt-3">
            {product.Description}
          </p>

          <p className="text-xs text-gray-300 mt-3">
            {isOutOfStock ? (
              <span className="text-red-400 font-medium">Out of stock</span>
            ) : (
              <span>{product.Stock} in stock</span>
            )}
          </p>

          <p className="text-3xl font-semibold text-gray-900 mt-6">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="w-10 h-10 flex items-center justify-center
                  hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                <Minus size={15} />
              </button>
              <span className="w-10 text-center text-sm font-medium text-gray-900">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(product.Stock, q + 1))}
                disabled={qty >= product.Stock}
                className="w-10 h-10 flex items-center justify-center
                  hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={adding || isOutOfStock}
              className="flex-1 flex items-center justify-center gap-2
                bg-blue-600 text-white font-medium py-2.5 rounded-lg
                hover:bg-blue-700 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? (
                <>
                  <LoadingSpinner size="sm" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}