import User from "../models/user.model.js";
import Income from "../models/income.model.js"
import Expense from "../models/expense.model.js"

// get profile info
const getProfileInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userId !== user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to update this user",
      });
    }

    if (user.email !== email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "user data updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong!",
    });
  }
};

// delete user account
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Income.deleteMany({ user: userId });
    await Expense.deleteMany({ user: userId });

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Account and all financial records deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the account",
      error: error.message,
    });
  }
};

export { getProfileInfo, updateUserProfile, deleteAccount };