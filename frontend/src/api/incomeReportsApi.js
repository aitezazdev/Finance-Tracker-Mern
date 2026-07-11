import api from "./client";


export const getIncomeMonthlySummary = async () => {
  const response = await api.get("/api/summary/monthly-report");
  console.log(response.data);
  return response.data;
};


export const getIncomeCategorySummary = async () => {
  const response = await api.get("/api/summary/category-report");
  return response.data;
};


export const getIncomeSpendingTrends = async () => {
  const response = await api.get("/api/summary/timeline-report");
  return response.data;
};