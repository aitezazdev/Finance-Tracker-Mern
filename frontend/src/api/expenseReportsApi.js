import api from "./client";


export const getExpenseMonthlySummary = async () => {
  const response = await api.get("/api/summary/monthly");
  console.log(response.data);
  
  return response.data;
};


export const getExpenseCategorySummary = async () => {
  const response = await api.get("/api/summary/category");
  return response.data;
};


export const getExpenseSpendingTrends = async () => {
  const response = await api.get("/api/summary/timeline");
  return response.data;
};