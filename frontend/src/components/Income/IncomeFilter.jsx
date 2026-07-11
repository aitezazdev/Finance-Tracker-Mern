import React from "react";

const IncomeFilter = ({ filter, setFilter }) => {
  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleSortChange = (e) => {
    setFilter({ ...filter, sortByAmount: e.target.value });
  };

  const resetFilters = () => {
    setFilter({ category: "", sortByAmount: "" });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
      <div className="flex flex-1 gap-3 w-full">
        <select
          value={filter.category}
          onChange={handleCategoryChange}
          className="w-1/2 px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold text-zinc-700 cursor-pointer">
          <option value="">Select category</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Refund">Refund</option>
          <option value="Gift">Gift</option>
          <option value="Others">Others</option>
        </select>

        <select
          value={filter.sortByAmount}
          onChange={handleSortChange}
          className="w-1/2 px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-semibold text-zinc-700 cursor-pointer">
          <option value="">Sort by Amount</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="w-full sm:w-auto bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
        Reset Filters
      </button>
    </div>
  );
};

export default IncomeFilter;
