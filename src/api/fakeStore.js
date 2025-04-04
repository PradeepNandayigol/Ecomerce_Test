import axios from 'axios';

const API = axios.create({ baseURL: 'https://fakestoreapi.com' });

export const loginUser = async (email, password) => {
  if (email === "test@example.com" && password === "password") {
    return { data: { id: 1, email, token: "mock_token_12345" } };
  }
  throw new Error("Invalid credentials");
};

export const getProducts = () => API.get('/products');
export const getProductCategories = () => API.get('/products/categories');
export const getProductsByCategory = (category) => API.get(`/products/category/${category}`);

export default API;
