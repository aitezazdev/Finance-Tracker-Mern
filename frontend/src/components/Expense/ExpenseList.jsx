import React, { useState } from "react";
import { deleteExpense, editExpense } from "../../api/expenseApi";

const ExpenseList = ({ expenses, setExpenses }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setEditData({ ...expense });
  };

  const handleSave = async () => {
    const response = await editExpense(editingId, editData);
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense._id === editingId ? response.data : expense
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const renderMobileView = () => {
    return (
      <div className="md:hidden space-y-4">
        {expenses.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            No expenses recorded yet.
          </div>
        ) : (
          expenses.map((expense) => (
            <div  
              key={expense._id}
              className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              {editingId === expense._id ? (
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
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
                      className="w-full px-3 py-2 border rounded">
                      <option value="">Select category</option>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Bills">Bills</option>
                      <option value="Health">Health</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
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
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
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
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded transition">
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 cursor-pointer hover:bg-gray-500 text-white px-4 py-2 rounded transition">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">Rs. {expense.amount}</span>
                    <span className="text-sm text-gray-500">
                      {expense.date}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {expense.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {expense.description || "—"}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1 text-sm rounded transition">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 text-sm rounded transition">
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
      <div className="hidden md:block overflow-y-auto max-h-[500px] border rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-900 text-white text-lg uppercase sticky top-0">
            <tr className="text-center">
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6">Amount (Rs)</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No expenses recorded yet.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className={`border-b transition Rs. {
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}>
                  {editingId === expense._id ? (
                    <>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="date"
                          value={editData.date}
                          onChange={(e) =>
                            setEditData({ ...editData, date: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <select
                          value={editData.category}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded">
                          <option value="">Select category</option>
                          <option value="Food">Food</option>
                          <option value="Transport">Transport</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Bills">Bills</option>
                          <option value="Health">Health</option>
                          <option value="Shopping">Shopping</option>
                          <option value="Others">Others</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="text"
                          value={editData.description}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          value={editData.amount}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              amount: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded text-center"
                        />
                      </td>
                      <td className="py-4 px-6 flex justify-center space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-6 py-2 rounded transition">
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 cursor-pointer hover:bg-gray-500 text-white px-4 py-2 rounded transition">
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-4 text-center">{expense.date}</td>
                      <td className="py-4 px-4 text-center">
                        {expense.category}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {expense.description || "—"}
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">
                        Rs. {expense.amount}
                      </td>
                      <td className="py-4 px-6 flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded transition">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded transition">
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
    <div className="overflow-hidden rounded-lg shadow-md">
      {renderMobileView()}
      {renderDesktopView()}
    </div>
  );
};

export default ExpenseList;
