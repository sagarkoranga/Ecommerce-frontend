import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/search?q=${query}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6">
          Search results for "<span className="text-blue-600">{query}</span>"
        </h2>

        {loading && <p className="text-gray-500">Searching...</p>}

        {!loading && products.length === 0 && (
          <p className="text-gray-500">No products found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/products/${p.id}`)}
              className="bg-white rounded-lg shadow hover:shadow-xl cursor-pointer transition p-4"
            >
              {p.images?.[0] && (
                <img
                  src={`http://localhost:3000${p.images[0]}`}
                  alt={p.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}

              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-gray-600">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
          <div className="-mx-48"><Footer /></div>
      
    </>
  );
}