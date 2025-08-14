import React from "react";
import TransactionForm from "./TransactionForm";

const TransactionModal = ({ show, onClose, setExpenses="", setIncomes="", setActiveTab="" }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md relative border border-gray-100 transform transition-all overflow-y-auto max-h-screen">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Close Modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Add New Transaction
        </h2>
        <TransactionForm onClose={onClose} setExpenses={setExpenses} setIncomes={setIncomes} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default TransactionModal;