import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// finanacial summary
export const getFinancialSummary = async () => {
  const response = await api.get("/api/summary/financial-report");
  return response.data;
};

// 5 recent transactions
export const getRecentTransactions = async () => {
  const response = await api.get("/api/summary/recent-transactions");
  return response.data;
};