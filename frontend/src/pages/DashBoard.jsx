import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import { getFinancialSummary, getRecentTransactions } from "../api/summaryApi";

const Dashboard = ({
  expenses,
  incomes,
  setShowModal,
  showModal,
  setExpenses,
  setIncomes,
  setActiveTab,
}) => {
  const [summaryData, setSummaryData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);

  const fetchSummary = async () => {
    try {
      const response = await getFinancialSummary();
      if (response.success) {
        setSummaryData(response.data);
      }
    } catch (error) {
      console.log("Error fetching summary data:", error);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const response = await getRecentTransactions();
      if (response.success) {
        setRecentTransactions(response.data);
      }
    } catch (error) {
      console.log("Error fetching recent transactions:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchRecentTransactions();
  }, [expenses, incomes]);

  return (
    <div className="flex pt-16 min-h-screen bg-zinc-50">
      <Sidebar setShowModal={setShowModal} />

      <div className="ml-0 md:ml-64 flex-1 p-6 sm:p-10 max-w-7xl w-full min-w-0 overflow-x-hidden">
        <div className="border-b border-zinc-200 pb-6 mb-8">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="mt-2 text-zinc-500 font-medium">
            A real-time snapshot of your financial flow, recent activity, and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm border-l-4 border-l-zinc-800">
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Total Income
            </h3>
            <p className="text-3xl font-black text-emerald-600 mt-2">
              Rs. {summaryData.totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm border-l-4 border-l-zinc-800">
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Total Expenses
            </h3>
            <p className="text-3xl font-black text-rose-600 mt-2">
              Rs. {summaryData.totalExpense.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm border-l-4 border-l-zinc-800">
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Remaining Balance
            </h3>
            <p className="text-3xl font-black text-emerald-600 mt-2">
              Rs. {summaryData.balance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-zinc-900">
            Recent Transactions
          </h3>
          
          <div className="md:hidden space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="py-8 text-center text-zinc-400 bg-white rounded-2xl border border-zinc-200 shadow-xs">
                No transactions recorded yet.
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div  
                  key={transaction._id}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 border-l-4 border-l-zinc-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`font-extrabold text-lg ${
                      transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      Rs. {transaction.amount}
                    </span>
                    <span className="text-xs font-medium text-zinc-400">
                      {transaction.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700">
                      {transaction.category}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                      transaction.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-sm">
                    {transaction.description || "—"}
                  </p>
                </div>
              ))
            )}
          </div>
          
          <div className="hidden md:block overflow-y-auto max-h-[500px] border border-zinc-200 rounded-2xl shadow-sm">
            <table className="min-w-full bg-white">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs uppercase tracking-wider sticky top-0">
                <tr className="text-left">
                  <th className="py-4 px-6 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold">Type</th>
                  <th className="py-4 px-6 font-semibold">Category</th>
                  <th className="py-4 px-6 font-semibold">Description</th>
                  <th className="py-4 px-6 font-semibold text-right">Amount (Rs)</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 text-sm divide-y divide-zinc-200">
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-zinc-400 font-medium">
                      No transactions recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-4 px-6 font-medium text-zinc-400">{transaction.date}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${
                          transaction.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {transaction.type === 'income' ? 'Income' : 'Expense'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-zinc-900 font-semibold">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-zinc-500 max-w-xs truncate">
                        {transaction.description || "—"}
                      </td>
                      <td className={`py-4 px-6 text-right font-bold text-base ${
                        transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} Rs. {transaction.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;