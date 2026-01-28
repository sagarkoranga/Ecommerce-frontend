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
    formData.append("image", image); // <-- actual file

    try {
      const res = await api.post(`/customer/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        alert("Registration Successful!");
        navigate("/login");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <input name="email" placeholder="Email" required />
        <br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br />

        <input name="city" placeholder="City" required />
        <br />

        <input
          name="mobile_no"
          placeholder="Mobile Number"
          required
          maxLength={10}
        />
        <br />

        <button type="submit" disabled={loading} >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}