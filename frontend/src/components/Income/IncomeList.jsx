import React, { useState } from "react";
import { deleteIncome, editIncome } from "../../api/incomeApi";

const IncomeList = ({ incomes, setIncomes }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (income) => {
    setEditingId(income._id);
    setEditData({ ...income });
  };

  const handleSave = async () => {
    try {
      const response = await editIncome(editingId, editData);
      setIncomes((prevIncomes) =>
        prevIncomes.map((income) =>
          income._id === editingId ? response.data : income
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income._id !== id)
      );
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const renderMobileView = () => {
    return (
      <div className="md:hidden space-y-4">
        {incomes.length === 0 ? (
          <div className="py-8 text-center text-zinc-400 bg-white rounded-2xl border border-zinc-200 shadow-xs">
            No incomes recorded yet.
          </div>
        ) : (
          incomes.map((income) => (
            <div  
              key={income._id}
              className="bg-white rounded-2xl shadow-sm p-5 border border-zinc-200 border-l-4 border-l-zinc-800">
              {editingId === income._id ? (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">Date</label>
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                      Category
                    </label>
                    <select
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800">
                      <option value="">Select category</option>
                      <option value="Salary">Salary</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Investment">Investment</option>
                      <option value="Refund">Refund</option>
                      <option value="Gift">Gift</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                      Description
                    </label>
                    <input
                      type="text"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
                      Amount (Rs. )
                    </label>
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          amount: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={handleSave}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-xs cursor-pointer">
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-xs cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-black text-emerald-600 text-lg">Rs. {Number(income.amount).toLocaleString()}</span>
                    <span className="text-xs font-semibold text-zinc-400">
                      {income.date}
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">
                      {income.category}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
                    {income.description || "—"}
                  </p>
                  <div className="flex justify-end gap-3 border-t border-zinc-200 pt-3">
                    <button
                      onClick={() => handleEdit(income)}
                      className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-semibold px-3 py-1.5 text-xs rounded-lg transition-all shadow-xs cursor-pointer">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(income._id)}
                      className="bg-white hover:bg-red-50 text-red-600 border border-zinc-200 font-semibold px-3 py-1.5 text-xs rounded-lg transition-all shadow-xs cursor-pointer">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  const renderDesktopView = () => {
    return (
      <div className="hidden md:block overflow-y-auto max-h-[500px] border border-zinc-200 rounded-2xl shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs uppercase tracking-wider sticky top-0">
            <tr className="text-left">
              <th className="py-4 px-6 font-semibold">Date</th>
              <th className="py-4 px-6 font-semibold">Category</th>
              <th className="py-4 px-6 font-semibold">Description</th>
              <th className="py-4 px-6 font-semibold">Amount (Rs)</th>
              <th className="py-4 px-6 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-zinc-700 text-sm divide-y divide-zinc-200">
            {incomes.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-zinc-400 font-medium">
                  No incomes recorded yet.
                </td>
              </tr>
            ) : (
              incomes.map((income) => (
                <tr
                  key={income._id}
                  className="hover:bg-zinc-50/50 transition-colors">
                  {editingId === income._id ? (
                    <>
                      <td className="py-3 px-4">
                        <input
                          type="date"
                          value={editData.date}
                          onChange={(e) =>
                            setEditData({ ...editData, date: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={editData.category}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800">
                          <option value="">Select category</option>
                          <option value="Salary">Salary</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Investment">Investment</option>
                          <option value="Refund">Refund</option>
                          <option value="Gift">Gift</option>
                          <option value="Others">Others</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={editData.description}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={editData.amount}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              amount: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm text-zinc-800"
                        />
                      </td>
                      <td className="py-3 px-6 flex justify-end gap-2 items-center">
                        <button
                          onClick={handleSave}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-xs cursor-pointer">
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-xs cursor-pointer">
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-6 text-zinc-400 font-medium">{income.date}</td>
                      <td className="py-4 px-6">
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">
                          {income.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-zinc-500 max-w-xs truncate">
                        {income.description || "—"}
                      </td>
                      <td className="py-4 px-6 font-bold text-zinc-900">
                        Rs. {Number(income.amount).toLocaleString()}
                      </td>
                      <td className="py-4 px-6 flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(income)}
                          className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-semibold px-3.5 py-1.5 rounded-xl text-sm transition-all shadow-xs cursor-pointer">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(income._id)}
                          className="bg-white hover:bg-red-50 text-red-600 border border-zinc-200 font-semibold px-3.5 py-1.5 rounded-xl text-sm transition-all shadow-xs cursor-pointer">
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderMobileView()}
      {renderDesktopView()}
    </div>
  );
};

export default IncomeList;
