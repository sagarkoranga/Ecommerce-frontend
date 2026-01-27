import { useNavigate } from "react-router-dom";

export default function LoginFirstModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.3s ease forwards",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "14px",
          padding: "30px 25px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          transform: "translateY(50px)",
          animation: "slideUp 0.4s ease forwards",
        }}
      >
        <h2 style={{ marginBottom: "12px", color: "#333" }}>🔒 Login Required</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          You need to login first to add items to your cart.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>

          <button
            onClick={onClose}
            style={{
              background: "#e0e0e0",
              color: "#333",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            0% {
              transform: translateY(50px) scale(0.8);
              opacity: 0;
            }
            60% {
              transform: translateY(-10px) scale(1.05);
              opacity: 1;
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}