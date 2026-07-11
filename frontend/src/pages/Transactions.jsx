import React, { useEffect, useState } from "react";
import ExpenseList from "../components/Expense/ExpenseList";

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
    <div className="flex pt-16 min-h-screen bg-zinc-50">
      <Sidebar setShowModal={setShowModal} />

      <div className="ml-0 md:ml-64 flex-1 p-6 sm:p-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 border-b border-zinc-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
              Your Transactions
            </h1>
            <p className="mt-2 text-zinc-500 font-medium">
              Manage, filter, and review all your logged income and expense records.
            </p>
          </div>
          
          <div className="inline-flex p-1 bg-zinc-200/80 rounded-xl shadow-xs border border-zinc-300/40">
            <button
              onClick={() => setActiveTab("Expenses")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "Expenses"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}>
              Expenses
            </button>
            <button
              onClick={() => setActiveTab("Incomes")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "Incomes"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
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

      </div>
    </div>
  );
};

export default Transactions;
