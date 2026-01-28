import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
 export const api = axios.create({
  baseURL:  API_URL,
});

api.interceptors.request.use((config) => {
  const Token = localStorage.getItem("Token");
  if (Token) {
    config.headers.Authorization = `Bearer ${Token}`;
  }
  return config;
});
export const getOrderSummary = () => api.get("/orders/summary");
export const placeOrder = () =>
  api.post("/orders/place");
export const getAllOrders = () => api.get("/orders/my");

export const getCategoryTree = () => api.get("/categories");
export const getProductsByCategory = (id) =>
  api.get(`/products/category/${id}`);

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const addToCart = (productId, quantity ) =>
  api.post("/cart/add", { productId, quantity });

export const getBestSellers = () => api.get("/products/bestsellers");
export const getMyOrders = () => api.get("/orders/my");

