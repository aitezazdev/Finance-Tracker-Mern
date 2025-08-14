import React, { useState } from "react";
import { addExpense } from "../api/expenseApi";
import { addIncome } from "../api/incomeApi";
import toast from "react-hot-toast";

const TransactionForm = ({ onClose, setExpenses, setIncomes, setActiveTab }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investment",
    "Refund",
    "Gift",
    "Others",
  ];

  const expenseCategories = [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Health",
    "Shopping",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "type") {
      setFormData((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";

    if (formData.amount && formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than zero";
    }

    if (new Date(formData.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (formData.type === "income") {
        const response = await addIncome(formData);
        toast.success("Income added");
        setIncomes((prev) => [response.data, ...prev]);
        setActiveTab("Incomes");

        setFormData({
          type: "income",
          amount: "",
          category: "",
          date: "",
          description: "",
        });

        setErrors({});
        onClose();
        return;
      }
      const response = await addExpense(formData);
      toast.success("Expense added");
      setExpenses((prev) => [response.data, ...prev]);
      setActiveTab("Expenses");

      setFormData({
        type: "expense",
        amount: "",
        category: "",
        date: "",
        description: "",
      });

      setErrors({});
      onClose();
    } catch (error) {
      toast.error("Error adding transaction");
    }
  };

  const availableCategories =
    formData.type === "income" ? incomeCategories : expenseCategories;

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type <span className="text-red-600">*</span>
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        />
        <p className="mb-3 text-red-500">{errors.amount}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category <span className="text-red-600">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        >
          <option value="">Select category</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <p className="mb-3 text-red-500">{errors.category}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date <span className="text-red-600">*</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        />
        <p className="mb-3 text-red-500">{errors.date}</p>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <input
          type="text"
          name="description"
          autoComplete="off"
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional description"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
      >
        Add {formData.type === "income" ? "Income" : "Expense"}
      </button>
    </form>
  );
};

export default TransactionForm;
