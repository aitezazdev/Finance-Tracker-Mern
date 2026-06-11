import api from "./client";

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