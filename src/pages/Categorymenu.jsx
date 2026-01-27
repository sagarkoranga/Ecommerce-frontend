import { useEffect, useState } from "react";
import { getCategoryTree } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryTree().then(res => setCategories(res.data));
  }, []);

  const handleMainClick = (e, id) => {
    e.stopPropagation();   
    navigate(`/category/${id}`);
  };

  const handleSubClick = (e, id) => {
    e.stopPropagation();   
    navigate(`/category/${id}`);
  };

  return (
    <div className="ml-35 flex gap-53">
      {categories.map(cat => (
        <div
          key={cat.id}
          className="relative"
          onClick={(e) => handleMainClick(e, cat.id)}
        >
          <span className="text-xl cursor-pointer hover:text-stone-700 font-semibold font-serif">
            {cat.name}
          </span>

          
          <div className="dropdown">
            {cat.children.map(sub => (
              <div
                key={sub.id}
                onClick={(e) => handleSubClick(e, sub.id)}
                className="cursor-pointer p-1 hover:bg-gray-200"
              >
                {sub.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}