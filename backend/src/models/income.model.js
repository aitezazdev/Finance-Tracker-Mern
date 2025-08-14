import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Salary",
        "Freelance",
        "Investment",
        "Refund",
        "Gift",
        "Others",
      ],
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
