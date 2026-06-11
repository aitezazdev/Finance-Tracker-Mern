import api from "./client";

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