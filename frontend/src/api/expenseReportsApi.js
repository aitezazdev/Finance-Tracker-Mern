import api from "./client";

// monthly summary
export const getExpenseMonthlySummary = async () => {
  const response = await api.get("/api/summary/monthly");
  console.log(response.data);
  
  return response.data;
};

// category summary
export const getExpenseCategorySummary = async () => {
  const response = await api.get("/api/summary/category");
  return response.data;
};

// spending trends
export const getExpenseSpendingTrends = async () => {
  const response = await api.get("/api/summary/timeline");
  return response.data;
};