import axios from "axios"

const API_URL = "http://localhost:3000/api/summary";

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

// monthly summary
export const getExpenseMonthlySummary = async () => {
  const response = await api.get("/monthly");
  console.log(response.data);
  
  return response.data;
};

// category summary
export const getExpenseCategorySummary = async () => {
  const response = await api.get("/category");
  return response.data;
};

// spending trends
export const getExpenseSpendingTrends = async () => {
  const response = await api.get("/timeline");
  return response.data;
};