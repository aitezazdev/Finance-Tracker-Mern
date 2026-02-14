import axios from "axios";

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

// get incomes
export const getIncomes = async () => {
  const response = await api.get("/api/get-incomes");
  return response.data;
};

// create an income
export const addIncome = async (income) => {
  const response = await api.post("/api/create-income", income);
  return response.data;
};

// delete income
export const deleteIncome = async (id) => {
  const response = await api.delete(`/api/delete-income/${id}`);
  return response.data;
};

// edit income
export const editIncome = async (id, editData) => {
  const response = await api.put(`/api/edit-income/${id}`, editData);
  return response.data;
};
