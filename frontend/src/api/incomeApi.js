import api from "./client";

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
