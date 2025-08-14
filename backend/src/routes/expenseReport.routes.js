import express from "express";
import {  } from "../controllers/expenseReport.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getExpenseCategorySummary, getExpenseMonthlySummary, getExpenseSpendingTrends } from "../controllers/expenseReport.controller.js";

const expenseReportRouter = express.Router();

expenseReportRouter.get("/monthly", authMiddleware, getExpenseMonthlySummary);
expenseReportRouter.get("/category", authMiddleware, getExpenseCategorySummary);
expenseReportRouter.get("/timeline", authMiddleware, getExpenseSpendingTrends);

export default expenseReportRouter;