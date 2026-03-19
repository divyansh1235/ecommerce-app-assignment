import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useGetCartQuery } from '../app/api/cartApi';
import { usePlaceOrderMutation } from '../app/api/ordersApi';
import CartItem from '../components/CartItem';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CartPage() {
  const navigate = useNavigate();
  const { data: cartItems = [], isLoading, isError } = useGetCartQuery();
  const [placeOrder, { isLoading: placing }] = usePlaceOrderMutation();

  const subtotal = cartItems.reduce((sum, item) => {
    console.log("Items",item.Product.price);
  return sum + item.Product.price * item.Quantity;
}, 0);

  const handlePlaceOrder = async () => {
    try {
      await placeOrder().unwrap();
      navigate('/orders');
    } catch {
      
    }
  };

  if (isLoading) {
    return <LoadingSpinner variant="page" message="Loading cart..." />;
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-medium">Failed to load cart.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 text-gray-300">
          <ShoppingBag size={48} className="mx-auto mb-4" />
          <p className="font-medium text-gray-400">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            Browse products
          </button>
        </div>
      ) : (
        <>
         
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <CartItem key={item.Id} item={item} />
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Items ({cartItems.length})</span>
                <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Delivery</span>
                <span className="text-green-500">Free</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-5 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full flex items-center justify-center gap-2
                bg-green-600 text-white font-medium py-3 rounded-lg
                hover:bg-green-700 transition-colors
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {placing ? (
                <>
                  <LoadingSpinner size="sm" />
                  Placing order...
                </>
              ) : (
                'Place Order →'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}