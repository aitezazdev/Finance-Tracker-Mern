import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Transactions from "./pages/Transactions";
import { getExpenses } from "./api/expenseApi";
import { getIncomes } from "./api/incomeApi";
import AnalyticsPage from "./pages/AnalyticsPage";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [activeTab, setActiveTab] = useState("Expenses");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setExpenses([]);
      }
    };

    user && fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await getIncomes();
        setIncomes(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setIncomes([]);
      }
    };

    user && fetchIncomes();
  }, []);

  return (
    <>
    <ToastContainer />
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <DashBoard
                expenses={expenses}
                incomes={incomes}
                showModal={showModal}
                setShowModal={setShowModal}
                setExpenses={setExpenses}
                setIncomes={setIncomes}
                setActiveTab={setActiveTab}
              />

            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
