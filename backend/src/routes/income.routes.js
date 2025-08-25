import express from "express";
import {createIncome, deleteIncome, editIncome, getIncomes} from "../controllers/income.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const incomeRouter = express.Router();

incomeRouter.post("/create-income", authMiddleware, createIncome);
incomeRouter.delete("/delete-income/:id", authMiddleware, deleteIncome);
incomeRouter.get("/get-incomes", authMiddleware, getIncomes);
incomeRouter.put("/edit-income/:id", authMiddleware, editIncome);

export default incomeRouter;