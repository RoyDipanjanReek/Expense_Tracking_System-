"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import axios from "axios";
import AddExpense from "../_components/AddExpense";

function Expences({ params }) {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expence, setExpence] = useState([])
  const { user } = useAuth;
  const { id } = React.use(params);
  const { budgetId } = React.use(params);

  console.log(id);

  const fetchBudgetData = async () => {
    try {
      const res = await axios("/api/getData");

      const data = await res.data;
      // console.log(data);

      const matchedItem = data.find((item) => item._id === id);
      // console.log(matchedItem, "matched data");

      if (Array.isArray(data)) {
        setBudgets(matchedItem);
      } else {
        setBudgets([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  const expenceData = async () => {
    try {
      const res = await axios("/api/getExpenceData/${budgetId}");
       const data = await res.data;
      console.log(data);
       if (Array.isArray(data)) {
        setExpence(data);
      } else {
        setExpence([]);
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchBudgetData();
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
        {fetchBudgetData? 
            <BudgetItem budget={budgets} /> :
        <div className="h-[150px] w-full bg-slate-300 rounded-lg animate-pulse">
        </div>
        }
        <AddExpense  
        refreshData ={() => (fetchBudgetData())}
        budgetId={budgets._id} />
      </div>
    </div>
  );
}

export default Expences;
