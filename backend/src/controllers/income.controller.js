import Income from "../models/income.model.js";
import User from "../models/user.model.js";

// create Income
const createIncome = async (req, res) => {
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

    const existingIncome = await Income.findOne({
      amount,
      category,
      date,
      description,
      user: userID,
    });

    if (existingIncome) {
      return res.status(200).json({
        success: true,
        message: "Income already exists",
        data: existingIncome,
        isDuplicate: true,
      });
    }

    const income = await Income.create({
      amount,
      category,
      date,
      description,
      user: userID,
    });

    const user = await User.findById(userID);
    if (user) {
      user.incomes.push(income._id);
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "Income created successfully",
      data: income,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// delete Income
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    await User.findByIdAndUpdate(income.user, {
      $pull: { incomes: id },
    });

    await Income.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
      data: income,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// edit an Income
const editIncome = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    if (amount !== undefined) {
      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than zero",
        });
      }
      income.amount = amount;
    }

    if (category) {
      income.category = category;
    }

    if (date) {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!dateFormatRegex.test(date)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format. Use YYYY-MM-DD",
        });
      }

      income.date = date;
    }

    if (description) {
      income.description = description;
    }

    await income.save();

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      data: income,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

// get all Incomes
const getIncomes = async (req, res) => {
  try {
    const userID = req.user.id;

    const Incomes = await Income.find({ user: userID });

    if (!Incomes) {
      return res.status(404).json({
        success: false,
        message: "Incomes not found",
      });
    }

    res.status(200).json({
      success: true,
      data: Incomes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

export { createIncome, deleteIncome, getIncomes, editIncome };
