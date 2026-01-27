import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, addToCart } from "../api";
import Navbar from "./Navbar";
import LoginFirstModal from "../components/LoginFirstModal";

import CategoryMenu from "./Categorymenu";
import Footer from "./Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
   const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getProductById(id).then(res => {
      setProduct(res.data);
    
      if (res.data.images?.length) {
        setSelectedImage(res.data.images[0]);
      }
    });
  }, [id]);


  if (!product) return <p>Loading...</p>;

  const handleAddToCart = async () => {

        const token = localStorage.getItem("Token");

    if (!token) {
      setShowPopup(true);
      return;
    }
    
    await addToCart(product.id, qty);
    alert("Added to cart")
  };

  return (
    <div className=" mt-6 pt-6 -mx-40  ">
      <div className="bg-gray-100 pt-5">
        <Navbar />


        <div className="   mt-6 w-385 ">

          <div className=" bg-white p-4 py-6 -mt-4 rounded shadow">
            <CategoryMenu />
          </div>
        </div>
      </div>

      <div className="mt-20 ml-20 pb-20">

        {selectedImage && (
          <img
            src={`http://localhost:3000${selectedImage}`}
            alt={product.title}
            width="350"
            style={{ border: "1px solid #ddd", marginBottom: "10px" }}
          />
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          {Array.isArray(product.images) &&
            product.images.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:3000${img}`}
                width="70"
                style={{
                  cursor: "pointer",
                  border:
                    selectedImage === img
                      ? "2px solid blue"
                      : "1px solid #ddd",
                }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
        </div>
      </div>

      <div className="-mt-150 border py-30 px-20 w-150 ml-150">
        <h2 className="text-left font-bold text-2xl">{product.title}</h2>
        <p className="text-left text-xl mt-5">{product.description}</p>
        <h3 className="text-left text-2xl font-bold mt-5">₹{product.price}</h3>

        <div >
          <label className="-ml-41 ">Quantity:</label>
          <input
            className="border-2  rounded border-gray-400 p-2 mt-5"
            type="number"
            value={qty}
            min={1}
            onChange={e => setQty(Number(e.target.value))}
            style={{ marginLeft: "10px" }}
          />
        </div>

        <button className="border p-2 px-7 rounded-lg bg-blue-500 text-blue-50 hover:bg-blue-700 hover:shadow-2xl transition-transform transform duration-300 hover:scale-110" onClick={handleAddToCart} style={{ marginTop: "15px" }}>
          Add to Cart
        </button>
      </div>
         {showPopup && (
        <LoginFirstModal onClose={() => setShowPopup(false)} />
      )}
      <div className="mt-20">
        <Footer/>
      </div>
      
    </div>
  );
}