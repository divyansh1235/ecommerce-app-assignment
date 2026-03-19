import { useGetOrdersQuery, usePlaceOrderMutation } from "../app/api/ordersApi";
import { Package } from 'lucide-react';

export default function OrdersPage() {
const { data: orders = [], isLoading, isError } = useGetOrdersQuery();

  if (isLoading) return <div className="text-center py-20">Loading orders...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border p-6">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-blue-600" />
                    <span className="font-semibold">Order #{order.id}</span>
                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(order.orderDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {order.status}
                </span>
              </div>

              <div className="divide-y">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span>{item.product.name} x {item.quantity}</span>
                    <span className="text-gray-600">
                      ₹{(item.priceAtPurchase * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                <span>Total</span>
                <span className="text-blue-600">
                  ₹{order.totalAmount.toFixed(2)}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}