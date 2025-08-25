import React from 'react'
import Sidebar from '../components/Sidebar'
import ExpenseReport from '../components/Expense/ExpenseReport';
import IncomeReport from '../components/Income/IncomeReport';

const AnalyticsPage = () => {

  const [activeTab, setActiveTab] = React.useState("Expenses");

  return (
    <div className="flex pt-16 min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64 flex-1 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="max-w-6xl">
            <h1 className="text-3xl font-bold text-center sm:text-left">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-center sm:text-left">
              Track and analyze your expenses and incomes.
            </p>
          </div>
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
              <ExpenseReport />
            </>
          ) : (
            <>
              <IncomeReport />
            </>
          )
        }
        {/* <TransactionModel
          show={showModal}
          onClose={() => setShowModal(false)}
          setExpenses={setExpenses}
          setIncomes={setIncomes}
          setActiveTab={setActiveTab}
        /> */}
      </div>
    </div>
  )
}

export default AnalyticsPage