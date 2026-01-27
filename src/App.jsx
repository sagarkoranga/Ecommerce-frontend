import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderSummary from './pages/OrdersSummary'
import OrderPlaced from './pages/Orderplaced'
import MyOrders from './pages/Myorders'
import CategoryProducts from './pages/Categoryproducts'
import Products from './pages/Product'
import ProductDetails from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResult'
import MapPage from './pages/MapPage'
import AboutUs from './pages/AboutUs'

function App() {
  const [count, setCount] = useState(0)


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
