import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart,Package,Store } from "lucide-react";
import { selectCartCount } from "../features/cart/cartSlice";
import { useGetCartQuery } from "../app/api/cartApi";
export default function Navbar()
{
    useGetCartQuery();
    const cartCount=useSelector(selectCartCount);
    return(
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <Store size={22} /> ShopApp
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Products
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600"
          >
            <Package size={18} /> Orders
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 text-gray-600 hover:text-blue-600"
          >
            <ShoppingCart size={20} /> Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
    );
}