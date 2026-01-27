import { useEffect, useState } from "react";
import { getAllOrders } from "../api.js";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-6 text-center">
          📦 My Orders
        </h2>

        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.orderId}
              className="bg-white rounded-xl shadow-md p-6"
            >
           
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>
                  <p className="font-semibold">
                    #{order.id}
                  </p>
                </div>
                <div>
                  Status:{order.status}
                </div>

                <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

            
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              
              <div className="flex justify-between items-center mt-5 border-t pt-4">
                <span className="text-gray-600 font-medium">
                  Total
                </span>
                <span className="text-lg font-bold text-green-600">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}