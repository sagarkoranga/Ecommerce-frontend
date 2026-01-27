import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await api.put(`/cart/${id}`, { quantity: qty });
    fetchCart();
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen ">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => {
                const image =
                  item.product.images?.length > 0
                    ? `http://localhost:3000${item.product.images[0]}`
                    : null;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border p-4 flex gap-4"
                  >
                   
                    <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden">
                      {image && (
                        <img
                          src={image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                   
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.product.title}
                      </h3>
                      <p className="text-gray-500 mt-1">
                        ₹ {item.product.price}
                      </p>

                     
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateQty(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQty(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹ {item.total}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm mt-3 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-xl shadow border p-6 h-fit sticky top-32">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-4">
                <span>Total</span>
                <span>₹ {grandTotal}</span>
              </div>

              <hr className="mb-4" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Grand Total</span>
                <span>₹ {grandTotal}</span>
              </div>

              <button
                onClick={() =>
                  navigate("/order-summary", { state: { cart } })
                }
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="-mx-48 mt-38">
        <Footer />
      </div>

    </div>
  );
}