import { useEffect, useState } from "react";
import axios from "axios";
import "/src/styles/banner.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Testimonials() {
  const [testimonial, settestimonial] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-alnr.onrender.com/testimonials/public")
      .then(res => settestimonial(res.data));
  }, []);

  if (!testimonial.length) return null;

  return (
        <div className="to-gray-200 bg-linear-to-b from-white p-4   -mt-24    ">
      <h2 className="text-xl font-bold mb-10 mt-10 ">Message From the Happy Customers</h2>
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      
      pagination={{ clickable: true }}
      navigation
      loop
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      }}
      className="testimonial-swiper  "
    >
      
      {testimonial.map((t) => (
        <SwiperSlide key={t.id}>
          <div className="testimonial-card my-5  ">
           <div className="rounded-lg px-20 pt-10">
            <img
              className="testimonial-img  "
              src={`https://ecommerce-backend-alnr.onrender.com${t.image}`}
              alt={t.name}
            /></div>

            <div className="testimonial-content">
              {t.name && <h3 className="testimonial-name">{t.name}</h3>}
              {t.message && <p className="testimonial-message">{t.message}</p>}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
   </div>

   
  );
}