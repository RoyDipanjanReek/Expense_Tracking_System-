"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import axios from "axios";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";

function dashboard() {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);

  const fetchBudgetData = async () => {
    try {
      const res = await axios.get("/api/getData");
      const data = await res.data;
      console.log(data);

      if (data) {
        setBudgets(data);
      } else {
        setBudgets(null);
      }
    } catch (err) {
      console.error("Error fetching budget data:", err);
      setBudgets(null);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, [user]);

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi,{user?.fullName}</h2>
      <p className="text-gray-500">
        Here's whats happenning with your money, Let's manage your expence
      </p>
      <CardInfo budgetDetails={budgets} />

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetDetails={budgets} />
        </div>
        {" "}
        <div>
          {Array.isArray(budgets) && budgets.length > 0 ? (
            budgets.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          ) : (
            <p>No budgets are loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default dashboard;
