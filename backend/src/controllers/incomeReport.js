import Income from "../models/income.model.js";
import User from "../models/user.model.js";

// for monthly summary
const getIncomeMonthlySummary = async (req, res) => {
  try {
    const userID = req.user.id;
    if (!userID) {
      return res.status(404).json({
        success: false,
        message: "user id not found",
      });
    }

    const user = await User.findById(userID).select("name email incomes");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.incomes || user.incomes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no incomes found for this user",
      });
    }

    const summary = await Income.aggregate([
      { $match: { _id: { $in: user.incomes } } },
      {
        $addFields: {
          convertedDate: { $toDate: "$date" }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$convertedDate" },
            month: { $month: "$convertedDate" },
          },
          totalIncome: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    if (summary.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no summary found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "summary for the user found successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      data: summary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

// for category wise summary
const getIncomeCategorySummary = async (req, res) => {
  try {
    const userID = req.user.id;
    if (!userID) {
      return res.status(404).json({
        success: false,
        message: "user id not found",
      });
    }

    const user = await User.findById(userID).select("name email incomes");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.incomes || user.incomes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no incomes found for this user",
      });
    }

    const summary = await Income.aggregate([
      { $match: { _id: { $in: user.incomes } } },
      {
        $group: {
          _id: {
            category: "$category",
          },
          totalIncome: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          totalIncome: -1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no summary found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "summary for the user found successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      data: summary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

// for daily trends
const getIncomeSpendingTrends = async (req, res) => {
  try {
    const userID = req.user.id;
    if (!userID) {
      return res.status(404).json({
        success: false,
        message: "user id not found",
      });
    }

    const user = await User.findById(userID).select("name email incomes");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const summary = await Income.aggregate([
      { $match: { _id: { $in: user.incomes } } },
      {
        $addFields: {
          convertedDate: { $toDate: "$date" }
        }
      },
      {
        $group: {
          _id: {
            $dateTrunc: { date: "$convertedDate", unit: "day" },
          },
          totalIncome: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]); 

    return res.status(200).json({
      success: true,
      message: "summary for the user found successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      data: summary,
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

export { getIncomeMonthlySummary, getIncomeCategorySummary, getIncomeSpendingTrends };
