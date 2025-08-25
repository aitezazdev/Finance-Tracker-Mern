import React, { useEffect, useState } from "react";
import {
  getExpenseCategorySummary,
  getExpenseMonthlySummary,
  getExpenseSpendingTrends,
} from "../../api/expenseReportsApi";
import Sidebar from "../Sidebar";
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
      icon: <FaRupeeSign className="text-2xl text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
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
      icon: <FaChartBar className="text-2xl text-purple-600" />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Top Category",
      value:
        categoryData.length > 0
          ? categoryData.sort((a, b) => b.totalSpent - a.totalSpent)[0]?._id
              ?.category || "N/A"
          : "N/A",
      icon: <FaMedal className="text-2xl text-green-600" />,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Months Tracked",
      value: monthlyData.length,
      icon: <FaCalendarAlt className="text-2xl text-amber-600" />,
      color: "bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="w-full">
        <div className="">

          {loading ? (
            <div className="flex flex-1 items-center justify-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">
                  Loading your expense data...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="max-w-6xl mx-auto my-8 px-4">
              <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center border border-red-200">
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
                <h3 className="text-lg font-medium mb-2">Data Loading Error</h3>
                <p>{error}</p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {summaryCards.map((card, index) => (
                  <div
                    key={index}
                    className={`${card.color} p-6 rounded-lg border shadow-sm transition-all hover:shadow-md`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          {card.title}
                        </p>
                        <p className="text-2xl font-bold mt-1 text-gray-800">
                          {card.value}
                        </p>
                      </div>
                      <div className="text-3xl">{card.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="flex border-b overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("monthly")}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "monthly"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    Monthly Expenses
                  </button>
                  <button
                    onClick={() => setActiveTab("category")}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "category"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    Categories
                  </button>
                  <button
                    onClick={() => setActiveTab("trends")}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "trends"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    Spending Trends
                  </button>
                  <button
                    onClick={() => setActiveTab("data")}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "data"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    Raw Data
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === "monthly" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                          Monthly Expenses
                        </h2>
                        <select
                          className="border rounded-md px-3 py-1.5 bg-white text-sm"
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
                      <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Expenses by Category
                      </h2>
                      <ExpenseCategoryChart data={categoryData} />
                    </div>
                  )}

                  {activeTab === "trends" && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Daily Spending Trends
                      </h2>
                      <ExpenseTrendsChart data={trendsData} />
                    </div>
                  )}

                  {activeTab === "data" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                          Monthly Expense Data
                        </h2>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Period
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Spent
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
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
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">
                                        {monthName} {item._id.year}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-semibold text-gray-900">
                                        Rs. {item.totalSpent.toLocaleString()}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan="2"
                                  className="px-6 py-4 text-center text-sm text-gray-500">
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
      </div>
    </div>
  );
};

export default ExpenseReport;
