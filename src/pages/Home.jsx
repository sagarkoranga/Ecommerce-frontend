import Navbar from "./Navbar";
import CategoryMenu from "./Categorymenu";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import BestsellerBanner from "./BestSeller";
import Testimonials from "./Testimonials";
import Footer from "./Footer";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className=" -mt-11 w-380    -mx-40  ">

     

      <div className="bg-gray-100  dashboard  ">
         <Navbar />
     </div>
        <div className="relative z-50 ml-2 bg-white py-5 mt-34 -mr-1 dash-btn ">
          <CategoryMenu />
        </div>


        <div className="relative bg-linear-to-b to-white from-gray-200 dash-btn -mr-1 z-10 ">
          <Banner />

        </div>
        <div className="py-10     ">
          <BestsellerBanner />
        </div>
        <div className=" -mr-1 ">
          <Testimonials />
        </div>


     



      <div className="-mr-1">
        <Footer />
      </div>
    </div>
  );
}