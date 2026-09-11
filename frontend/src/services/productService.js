import axios from "axios";

const API_URL = "http://localhost:5000/products";

export const getProducts = () => {
  return axios.get(API_URL);
};

export const addProduct = (product) => {
  return axios.post(API_URL, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getLowStockProducts = () => {
  return axios.get(`${API_URL}/low-stock`);
};