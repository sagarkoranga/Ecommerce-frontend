import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/amazon-shopping-2021-03-02.webp";
import "/src/styles/banner.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query,setQuery]=useState("")
  const navigate = useNavigate();
  const dropdownRef = useRef();

 

  useEffect(() => {
    const Token = localStorage.getItem("Token");
    if (Token) setIsLoggedIn(true);

 

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    useEffect(()=>{
    if (!query.trim())return;
    const timer=setTimeout(()=>{
      navigate(`/search?q=${query}`);
    },1000);
    return()=>clearTimeout(timer);
   },[query,navigate]);
  
  const search=(e)=>{
    e.preventDefault();
    if(!query.trim())
      return;
    navigate(`/search?q=${query}`);
    setQuery("")
  }

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
   
    navigate("/");
  };

const user = JSON.parse(localStorage.getItem("user")) || {};
const userImage = user.image
  ? `http://localhost:3000${user.image}`
  : "http://localhost:3000/uploads/profile/default.png";

  return (
    <>
     
      <nav className="fixed top-0 left-0 w-378 py-5 z-100 bg-[#f0f0ea] shadow-md px-6  flex items-center justify-between">
     
        <img 
          src={logo}
          alt="Logo"
          className="h-18 rounded-lg cursor-pointer"
          onClick={() => navigate("/")}
        />

      
        <form  onSubmit={search} className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            className="ml-100  bg-white border w-90 border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition">
            Search
          </button>
        </form>

       
        <div className="flex items-center space-x-4 relative">
          {!isLoggedIn ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="relative mr-20" ref={dropdownRef}>
             
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={userImage}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

            
              <div
                className={`absolute right-0 mt-2 w-48  bg-white shadow-lg rounded-md overflow-hidden transition-all duration-200 ${
                  dropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                } z-50`}
              >
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => navigate("/my-orders")}
                >
                  My Orders
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => navigate("/cart")}
                >
                  Cart
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

    </>
  );
}