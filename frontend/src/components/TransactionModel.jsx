import React from "react";
import TransactionForm from "./TransactionForm";

const TransactionModal = ({ show, onClose, setExpenses="", setIncomes="", setActiveTab="" }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-md p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative border border-zinc-200 transform transition-all overflow-y-auto max-h-screen">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 p-2 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
          title="Close Modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-extrabold mb-6 text-zinc-900 tracking-tight">
          Add New Transaction
        </h2>
        <TransactionForm onClose={onClose} setExpenses={setExpenses} setIncomes={setIncomes} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default TransactionModal;