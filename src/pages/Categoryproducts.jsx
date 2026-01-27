import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCategory } from "../api";
import Navbar from "./Navbar";
import "/src/styles/banner.css";
import CategoryMenu from "./Categorymenu";
import Footer from "./Footer";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProductsByCategory(id).then(res => setProducts(res.data));
  }, [id]);

  if (!products.length) return <h2>No products found</h2>;

  return (
    <div className=" w-303" style={{ padding: "20px" }}>
      <div className="    shadow-xl rounded-2xl -mx-43"><Navbar />

        <div className="   mt-20 w-379 ">

          <div className=" bg-white p-4   rounded shadow">
            <CategoryMenu />
          </div>
        </div>

        <h2 className="mt-30  text-3xl font-semibold ">Products</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
          {products.map(p => {
            const firstImage = Array.isArray(p.images) && p.images.length > 0
              ? `http://localhost:3000${p.images[0]}`
              : null;

            return (
              <div className="mx-10">
              <div className="transition-transform dashboard  dash-btn transform mt-5  rounded duration-300 hover:scale-110 hover:shadow-2xl"
                key={p.id}
                onClick={() => navigate(`/products/${p.id}`)}
                style={{
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {firstImage && (
                  <img className="w-200 h-80 rounded"

                    src={firstImage}
                    alt={p.title}
                   
                    style={{ objectFit: "cover" }}
                  />
                )}
                <h4>{p.title}</h4>
                <p>₹ {p.price}</p>
              </div>
              
              </div>
              
            );
          })}
          
        </div>
        <div className="mt-10">
          <Footer/>
        </div>
       
      </div>
      
    </div>
  );
}