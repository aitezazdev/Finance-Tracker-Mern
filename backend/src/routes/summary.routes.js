import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getFinancialSummary, getRecentTransactions } from "../controllers/summary.controller.js";

const summaryRouter = express.Router();

summaryRouter.get("/financial-report", authMiddleware, getFinancialSummary);
summaryRouter.get("/recent-transactions", authMiddleware, getRecentTransactions);

export default summaryRouter;
