import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          No order details found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-600">
            🎉 Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mt-2">
            Thank you for shopping with us
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4 mb-6">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {order.orderId}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-yellow-600 font-semibold">
              {order.status || "PENDING"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Total Amount:</span>{" "}
            <span className="text-green-700 font-bold">
              ₹{order.totalAmount}
            </span>
          </p>
          <p>
            <span className="font-semibold">Placed On:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

      
        <h3 className="text-xl font-semibold mb-3">
          🛒 Order Items
        </h3>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <div>
                <p className="font-semibold">
                  {item.product?.title || item.title}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ₹{item.price}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-600 text-lg">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-1/2 py-3 border rounded-lg hover:bg-gray-100 transition"
          >
            🏠 Go to Home
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="w-full sm:w-1/2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📦 View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}