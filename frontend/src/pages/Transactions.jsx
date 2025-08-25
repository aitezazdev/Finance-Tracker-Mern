import React, { useEffect, useState } from "react";
import ExpenseList from "../components/Expense/ExpenseList";
import TransactionModel from "../components/TransactionModel";
import ExpenseFilter from "../components/Expense/ExpenseFilter";
import { getExpenses } from "../api/expenseApi";
import { getIncomes } from "../api/incomeApi";
import Sidebar from "../components/Sidebar";
import IncomeList from "../components/Income/IncomeList";
import IncomeFilter from "../components/Income/IncomeFilter";

const Transactions = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ category: "", sortByAmount: "" });
  const [activeTab, setActiveTab] = useState("Expenses");

  const applyFilters = (items) => {
    return items
      .filter((item) =>
        filter.category ? item.category === filter.category : true
      )
      .sort((a, b) => {
        if (filter.sortByAmount === "asc") return a.amount - b.amount;
        if (filter.sortByAmount === "desc") return b.amount - a.amount;
        return 0;
      });
  };


  const filteredExpenses = applyFilters(expenses);
  const filteredIncomes = applyFilters(incomes);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();
        setExpenses(response.data);
        console.log("Expenses fetched:", response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await getIncomes();
        setIncomes(response.data);
        console.log("Incomes fetched:", response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setIncomes([]);
      }
    };

    fetchIncomes();
  }, []);

  return (
    <div className="flex pt-16 min-h-screen bg-gray-100">
      <Sidebar setShowModal={setShowModal} />

      <div className="ml-64 flex-1 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Your Transactions
          </h1>
          <div className="flex gap-10 border-b">
            <button
              onClick={() => setActiveTab("Expenses")}
              className={`cursor-pointer py-1 text-xl font-semibold ${
                activeTab === "Expenses"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              Expenses
            </button>
            <button
              onClick={() => setActiveTab("Incomes")}
              className={`cursor-pointer py-1 text-xl font-semibold ${
                activeTab === "Incomes"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              Incomes
            </button>
          </div>
        </div>
        {
          activeTab === "Expenses" ? (
            <>
              <ExpenseFilter filter={filter} setFilter={setFilter} />
              <ExpenseList
                expenses={filteredExpenses}
                setExpenses={setExpenses}
              />
            </>
          ) : (
            <>
              <IncomeFilter filter={filter} setFilter={setFilter} />
              <IncomeList
                incomes={filteredIncomes}
                setIncomes={setIncomes}
              />
            </>
          )
        }
        <TransactionModel
          show={showModal}
          onClose={() => setShowModal(false)}
          setExpenses={setExpenses}
          setIncomes={setIncomes}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Transactions;
