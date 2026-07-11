import React from 'react'
import Sidebar from '../components/Sidebar'
import ExpenseReport from '../components/Expense/ExpenseReport';
import IncomeReport from '../components/Income/IncomeReport';

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = React.useState("Expenses");

  return (
    <div className="flex pt-16 min-h-screen bg-zinc-50">
      <Sidebar />

      <div className="ml-0 md:ml-64 flex-1 p-6 sm:p-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 border-b border-zinc-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-zinc-500 font-medium">
              Real-time cashflow analysis, monthly insights, and category-wise spending trends.
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

        {activeTab === "Expenses" ? (
          <ExpenseReport />
        ) : (
          <IncomeReport />
        )}
      </div>
    </div>
  )
}

export default AnalyticsPage