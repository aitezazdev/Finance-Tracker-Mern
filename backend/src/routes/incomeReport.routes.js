import express from "express";
import {  } from "../controllers/expenseReport.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getIncomeCategorySummary, getIncomeMonthlySummary, getIncomeSpendingTrends } from "../controllers/incomeReport.js";

const incomeReportRouter = express.Router();

incomeReportRouter.get("/monthly-report", authMiddleware, getIncomeMonthlySummary);
incomeReportRouter.get("/category-report", authMiddleware, getIncomeCategorySummary);
incomeReportRouter.get("/timeline-report", authMiddleware, getIncomeSpendingTrends);

export default incomeReportRouter;