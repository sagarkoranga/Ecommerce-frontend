import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";
import { placeOrder } from "../api";

export default function OrderSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart || [];
  const grandTotal = cart.reduce((sum, i) => sum + i.total, 0);

  const placeOrderHandler = async () => {
    if (!cart.length) {
      alert("Cart is empty!");
      return;
    }

    const Token = localStorage.getItem("Token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!Token || !user?.id) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const cartItems = cart.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    try {
      const res = await placeOrder(cartItems);

      for (let item of cart) {
        await api.delete(`/cart/${item.id}`);
      }

      navigate("/order-placed", { state: { order: res.data } });
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        
       
        <h2 className="text-2xl font-bold mb-6 border-b pb-3">
          🧾 Order Summary
        </h2>

      
        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <div>
                <h4 className="font-semibold text-lg">
                  {item.product.title}
                </h4>
                <p className="text-sm text-gray-600">
                  Price: ₹{item.product.price}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-lg text-green-600">
                  ₹{item.total}
                </p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold">Grand Total</h3>
          <h3 className="text-2xl font-bold text-green-700">
            ₹{grandTotal}
          </h3>
        </div>

        
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
          >
            ← Back to Cart
          </button>

          <button
            onClick={placeOrderHandler}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}