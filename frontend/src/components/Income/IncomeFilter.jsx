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
    <div className="flex flex-col w-full sm:flex-row sm:items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex md:space-x-4 space-x-1">
        <select
          value={filter.category}
          onChange={handleCategoryChange}
          className="md:px-4 py-3 border w-1/2 text-sm md:text-base rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition">
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
          className="md:px-4 py-3 w-1/2 md:text-base text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition">
          <option value="">Sort by Amount</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg transition mt-3 sm:mt-0">
        Reset Filters
      </button>
    </div>
  );
};

export default IncomeFilter;
