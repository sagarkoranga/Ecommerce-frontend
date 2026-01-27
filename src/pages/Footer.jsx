import React from 'react'
import Contact from './Contact'
import MapPage from './MapPage'
import { useNavigate } from 'react-router-dom'





export default function () {
  const navigate=useNavigate();
  return (
    <div className='bg-[#05263b] py-11  -mb-15'>
     <Contact/>
     <div className='ml-250 mt-9'>
     <h1 className='text-white -mt-40 '>Quick Links</h1>
     <button  className="text-white mt-2 ml-7 hover:text-amber-500 hover:underline cursor-pointer" onClick={()=>navigate('/map')}>Contact Us</button><br></br>
     <button  className="text-white mt-2 ml-7 hover:text-amber-500 hover:underline cursor-pointer" onClick={()=>navigate('/about')}>About Us</button>
     </div>
     <div className='border h-45   w-0 -my-19 -mb-2 border-white ml-300'>
     
     </div>
     

    </div>
  )
}
