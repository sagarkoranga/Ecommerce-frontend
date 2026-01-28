import { useEffect, useState } from "react";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

export default function BestsellerBanner() {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    axios.get("https://ecommerce-backend-alnr.onrender.com/products/bestsellers")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!products.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg   ">
      <h2 className="text-xl font-bold mb-10 mt-10 ">🔥 Bestsellers</h2>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation
        loop
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 6 },
        }}
      >
       
        {products.map(p => (
          <SwiperSlide key={p.id}>
            <div className="bg-white border  rounded-lg p-3 hover:drop-shadow-xl my-10 transition-transform transform duration-300 hover:scale-110 ">
              {Array.isArray(p.images) && p.images.length > 0 && (
                <img
                 onClick={() => navigate(`/products/${p.id}`)}
                  src={`https://ecommerce-backend-alnr.onrender.com${p.images[0]}`}
                  alt={p.title}
                  className="w-full h-52 object-cover rounded-md mb-2"
                />
              )}

              <h3 className="font-semibold truncate">{p.title}</h3>
              <p className="text-green-700 font-bold">₹ {p.price}</p>
            </div>
          </SwiperSlide>
        ))}
        
      </Swiper>
      
    </div>
    
    
  );
}

