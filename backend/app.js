import express from "express"
import dbConnection from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import expenseRouter from "./src/routes/expense.routes.js";
import expenseReport from "./src/routes/expenseReport.routes.js";
import incomeRouter from "./src/routes/income.routes.js";
import summaryRouter from "./src/routes/summary.routes.js";
import incomeReportRouter from "./src/routes/incomeReport.routes.js";
import userRouter from "./src/routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnection();

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.use("/auth", authRouter);
app.use("/auth", userRouter);
app.use("/api", expenseRouter);
app.use("/api", incomeRouter);
app.use("/api/summary", expenseReport);
app.use("/api/summary", incomeReportRouter);
app.use("/api/summary", summaryRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});