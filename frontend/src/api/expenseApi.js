import api from "./client";


// get expenses
export const getExpenses = async () => {
  const response = await api.get("/api/get-expenses");
  return response.data;
};


// create an expense
export const addExpense = async (expense) => {
  const response = await api.post("/api/create-expense", expense);
  return response.data;
}

// delete expense
export const deleteExpense = async (id) => {
  const response = await api.delete(`/api/delete-expense/${id}`);
  return response.data;
}

// edit expense
export const editExpense = async (id, editData) => {
  const response = await api.put(`/api/edit-expense/${id}`, editData);
  return response.data;
}