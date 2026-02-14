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

// monthly summary
export const getIncomeMonthlySummary = async () => {
  const response = await api.get("/api/summary/monthly-report");
  console.log(response.data);
  return response.data;
};

// category summary
export const getIncomeCategorySummary = async () => {
  const response = await api.get("/api/summary/category-report");
  return response.data;
};

// spending trends
export const getIncomeSpendingTrends = async () => {
  const response = await api.get("/api/summary/timeline-report");
  return response.data;
};