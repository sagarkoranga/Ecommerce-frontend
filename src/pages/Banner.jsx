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

export default function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/banners/public")
      .then(res => setBanners(res.data));
  }, []);

  if (!banners.length) return null;

  return (
  <Swiper
    modules={[Autoplay, Pagination, Navigation]}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    pagination={{ clickable: true }}
    navigation
    loop
    spaceBetween={15}
    slidesPerView={1}
    breakpoints={{
      640: {
        slidesPerView: 2, // tablet
      },
      1024: {
        slidesPerView: 4, 
      },
    }}
    className="banner-swiper"
  >
    {banners.map((banner) => (
      <SwiperSlide key={banner.id}>
        <div className="banner-slide ">
          <img
            className="rounded-lg w-full h-56 object-cover"
            src={`http://localhost:3000${banner.image}`}
            alt={banner.title}
          />
      
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);
}