import React, { useEffect, useState } from "react";
import TransactionModel from "../components/TransactionModel";
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
    <div className="flex pt-16 min-h-screen bg-gray-100">
      <Sidebar setShowModal={setShowModal} />

      <div className="ml-64 flex-1 p-4 sm:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white px-6 py-12 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-600 text-center text-sm font-medium">
              Total Income
            </h3>
            <p className="text-2xl text-center font-semibold text-green-600 mt-2">
              Rs. {summaryData.totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-white px-6 py-12 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-600 text-center text-sm font-medium">
              Total Expenses
            </h3>
            <p className="text-2xl text-center font-semibold text-red-600 mt-2">
              Rs. {summaryData.totalExpense.toLocaleString()}
            </p>
          </div>

          <div className="bg-white px-6 py-12 rounded-xl shadow-md border-l-4 border-indigo-500">
            <h3 className="text-gray-600 text-center text-sm font-medium">
              Remaining Balance
            </h3>
            <p className="text-2xl text-center font-semibold text-indigo-600 mt-2">
              Rs. {summaryData.balance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Transactions
          </h3>
          
          <div className="md:hidden space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="py-6 text-center text-gray-500 bg-white rounded-lg shadow-md">
                No transactions recorded yet.
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div  
                  key={transaction._id}
                  className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
                    transaction.type === 'income' ? 'border-green-500' : 'border-red-500'
                  }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold text-lg ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Rs. {transaction.amount}
                    </span>
                    <span className="text-sm text-gray-500">
                      {transaction.date}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-xs px-2 py-1 rounded ">
                      {transaction.category}
                    </span>
                    <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    {transaction.description || "—"}
                  </p>
                </div>
              ))
            )}
          </div>
          
          <div className="hidden md:block overflow-y-auto max-h-[500px] border rounded-lg shadow-md">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-gray-900 text-white text-lg uppercase sticky top-0">
                <tr className="text-center">
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Type</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Description</th>
                  <th className="py-4 px-4">Amount (Rs)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-md">
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-500">
                      No transactions recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map((transaction, index) => (
                    <tr
                      key={transaction._id}
                      className={`border-b transition hover:bg-gray-200 ${
                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      }`}>
                      <td className="py-4 px-4 text-center">{transaction.date}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type === 'income' ? 'Income' : 'Expense'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-2 py-1 rounded text-sm">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {transaction.description || "—"}
                      </td>
                      <td className={`py-4 px-4 text-center font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Rs. {transaction.amount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

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

export default Dashboard;