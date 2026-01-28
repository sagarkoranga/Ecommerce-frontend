import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("city", e.target.city.value);
    formData.append("mobile_no", e.target.mobile_no.value);
    formData.append("image", image);

    try {
      const res = await api.post("/customer/register", formData);
      const data = res.data;

      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700 cursor-pointer"
          />

          <input
            name="city"
            placeholder="City"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="mobile_no"
            placeholder="Mobile Number"
            maxLength={10}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold
              hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}