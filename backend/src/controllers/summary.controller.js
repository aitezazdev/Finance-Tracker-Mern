import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";
import User from "../models/user.model.js";

// get financial summary like total income, total expense and balance
const getFinancialSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("incomes")
      .populate("expenses");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const incomes = user.incomes || [];
    const expenses = user.expenses || [];

    const totalIncome = incomes.reduce(
      (total, income) => total + income.amount,
      0
    );
    const totalExpense = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const balance = totalIncome - totalExpense;

    return res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
      },
    });
  } catch (error) {
    console.error("Financial summary error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// 5 recent transactions (from incomes and expenses)
const getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const recentIncomes = await Income.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentExpenses = await Expense.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const incomesWithType = recentIncomes.map((tx) => ({
      ...tx,
      type: "income",
    }));
    const expensesWithType = recentExpenses.map((tx) => ({
      ...tx,
      type: "expense",
    }));

    const combined = [...incomesWithType, ...expensesWithType].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const recentTransactions = combined.slice(0, 5);

    return res.status(200).json({
      success: true,
      data: recentTransactions,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export { getFinancialSummary, getRecentTransactions };
