import api from "./client";


export const getFinancialSummary = async () => {
  const response = await api.get("/api/summary/financial-report");
  return response.data;
};


export const getRecentTransactions = async () => {
  const response = await api.get("/api/summary/recent-transactions");
  return response.data;
};