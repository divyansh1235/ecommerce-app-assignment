import { Trash2, Minus, Plus } from 'lucide-react';
import { useUpdateCartItemMutation, useRemoveFromCartMutation } from '../app/api/cartApi';

export default function CartItem({ item }) {
  const [updateItem, { isLoading: updating }] = useUpdateCartItemMutation();
  const [removeItem, { isLoading: removing }] = useRemoveFromCartMutation();
  console.log("CartItem",item);

  const subtotal = (item.Product.price * item.Quantity).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4">
      <img
        src={item.Product.ImageUrl}
        alt={item.Product.name}
        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=?'; }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{item.Product.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          ₹{item.Product.price.toLocaleString('en-IN')} each
        </p>
      </div>

     
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => updateItem({ id: item.Id, quantity: Math.max(1, item.Quantity - 1) })}
          disabled={updating || item.Quantity <= 1}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50
            transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minus size={13} />
        </button>
        <span className="w-8 text-center text-sm font-medium text-gray-900">
          {item.Quantity}
        </span>
        <button
          onClick={() => updateItem({ id: item.Id, quantity: item.Quantity + 1 })}
          disabled={updating}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50
            transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={13} />
        </button>
      </div>

      <span className="text-sm font-medium text-gray-900 min-w-[60px] text-right">
        ₹{subtotal}
      </span>

      <button
        onClick={() => removeItem(item.Id)} 
        disabled={removing}
        className="w-8 h-8 flex items-center justify-center text-red-400
          hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
      >
        {console.log(item)}
        <Trash2 size={14} />
      </button>
    </div>
  );
}