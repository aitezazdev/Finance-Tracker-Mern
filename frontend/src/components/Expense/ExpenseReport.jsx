import React, { useEffect, useState } from "react";
import {
  getExpenseCategorySummary,
  getExpenseMonthlySummary,
  getExpenseSpendingTrends,
} from "../../api/expenseReportsApi";
import {
  FaChartBar,
  FaMedal,
  FaCalendarAlt,
} from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa6";
import ExpenseMonthlyChart from "./ExpenseMonthlyChart";
import ExpenseCategoryChart from "./ExpenseCategoryChart";
import ExpenseTrendsChart from "./ExpenseTrendsChart";

const ExpenseReport = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("monthly");
  const [yearFilter, setYearFilter] = useState("all");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [monthlyResponse, categoryResponse, trendsResponse] =
          await Promise.all([
            getExpenseMonthlySummary(),
            getExpenseCategorySummary(),
            getExpenseSpendingTrends(),
          ]);

        if (monthlyResponse.success) setMonthlyData(monthlyResponse.data);
        if (categoryResponse.success) setCategoryData(categoryResponse.data);
        if (trendsResponse.success) setTrendsData(trendsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load summary data. Please try again.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const availableYears = [
    ...new Set(monthlyData.map((item) => item._id.year)),
  ].sort();

  const filteredMonthlyData =
    yearFilter === "all"
      ? monthlyData
      : monthlyData.filter((item) => item._id.year === parseInt(yearFilter));

  const summaryCards = [
    {
      title: "Total Spending",
      value: `Rs. ${monthlyData
        .reduce((sum, item) => sum + item.totalSpent, 0)
        .toLocaleString()}`,
      icon: <FaRupeeSign className="text-xl text-indigo-600" />,
      color: "bg-white border-zinc-200",
    },
    {
      title: "Monthly Average",
      value: `Rs. ${
        monthlyData.length > 0
          ? (
              monthlyData.reduce((sum, item) => sum + item.totalSpent, 0) /
              monthlyData.length
            ).toFixed(2)
          : 0
      }`,
      icon: <FaChartBar className="text-xl text-indigo-600" />,
      color: "bg-white border-zinc-200",
    },
    {
      title: "Top Category",
      value:
        categoryData.length > 0
          ? categoryData.sort((a, b) => b.totalSpent - a.totalSpent)[0]?._id
              ?.category || "N/A"
          : "N/A",
      icon: <FaMedal className="text-xl text-indigo-600" />,
      color: "bg-white border-zinc-200",
    },
    {
      title: "Months Tracked",
      value: monthlyData.length,
      icon: <FaCalendarAlt className="text-xl text-indigo-600" />,
      color: "bg-white border-zinc-200",
    },
  ];

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-zinc-500 font-medium">
              Loading your expense data...
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="my-8">
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-200">
            <svg
              className="w-12 h-12 mx-auto text-red-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Data Loading Error</h3>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div className="w-full py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md hover:border-zinc-300 flex items-center justify-between`}>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold mt-1 text-zinc-900">
                    {card.value}
                  </p>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden mb-8">
            <div className="flex border-b border-zinc-200 bg-zinc-50/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab("monthly")}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === "monthly"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}>
                Monthly Expenses
              </button>
              <button
                onClick={() => setActiveTab("category")}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === "category"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}>
                Categories
              </button>
              <button
                onClick={() => setActiveTab("trends")}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === "trends"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}>
                Spending Trends
              </button>
              <button
                onClick={() => setActiveTab("data")}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === "data"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}>
                Raw Data
              </button>
            </div>

            <div className="p-6">
              {activeTab === "monthly" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-zinc-950">
                      Monthly Expenses
                    </h2>
                    <select
                      className="border border-zinc-300 rounded-xl px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}>
                      <option value="all">All Years</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ExpenseMonthlyChart data={filteredMonthlyData} />
                </div>
              )}

              {activeTab === "category" && (
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 mb-6">
                    Expenses by Category
                  </h2>
                  <ExpenseCategoryChart data={categoryData} />
                </div>
              )}

              {activeTab === "trends" && (
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 mb-6">
                    Daily Spending Trends
                  </h2>
                  <ExpenseTrendsChart data={trendsData} />
                </div>
              )}

              {activeTab === "data" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-zinc-950">
                      Monthly Expense Data
                    </h2>
                  </div>

                  <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                    <table className="min-w-full divide-y divide-zinc-200">
                      <thead className="bg-zinc-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Period
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Total Spent
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-zinc-200 text-zinc-700">
                        {filteredMonthlyData.length > 0 ? (
                          filteredMonthlyData.map((item, index) => {
                            const monthNames = [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ];
                            const monthName =
                              monthNames[item._id.month - 1];
                            return (
                              <tr key={index} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  {monthName} {item._id.year}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900">
                                  Rs. {item.totalSpent.toLocaleString()}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              className="px-6 py-8 text-center text-sm text-zinc-400">
                              No data available for the selected period
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseReport;
