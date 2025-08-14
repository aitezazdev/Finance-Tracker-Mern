import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
}

export const login = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
}