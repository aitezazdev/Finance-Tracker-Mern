import Expense from "../models/expense.model.js";
import User from "../models/user.model.js";

// create expense
const createExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "amount cannot be negative",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "category is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "date is required",
      });
    }

    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFormatRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    const parsedDate = new Date(date);
    const currrentDate = new Date();

    if(parsedDate.getTime() > currrentDate.getTime()) {
      return res.status(400).json({
        success: false,
        message: "Date cannot be in the future",
      });
    }

    const userID = req.user.id;

    const existingExpense = await Expense.findOne({
      amount,
      category,
      date,
      description,
      user: userID,
    });

    if (existingExpense) {
      return res.status(200).json({
        success: true,
        message: "Expense already exists",
        data: existingExpense,
        isDuplicate: true,
      });
    }

    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
      user: userID,
    });

    const user = await User.findById(userID);
    if (user) {
      user.expenses.push(expense._id);
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "expense created successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// delete expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await User.findByIdAndUpdate(expense.user, {
      $pull: { expenses: id },
    });

    await Expense.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: expense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// edit an expense
const editExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    if (amount !== undefined) {
      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than zero",
        });
      }
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (date) {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!dateFormatRegex.test(date)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format. Use YYYY-MM-DD",
        });
      }

      expense.date = date;
    }

    if (description) {
      expense.description = description;
    }

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

// get all expenses
const getExpenses = async (req, res) => {
  try {
    const userID = req.user.id;

    const expenses = await Expense.find({ user: userID });

    if (!expenses) {
      return res.status(404).json({
        success: false,
        message: "Expenses not found",
      });
    }

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

export { createExpense, deleteExpense, getExpenses, editExpense };
