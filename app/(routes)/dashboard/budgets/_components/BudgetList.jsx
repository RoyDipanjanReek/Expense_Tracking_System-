"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import axios from "axios";

function BudgetList() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const res = await axios("/api/getData");
        console.log(res);
        

        const data = await res.data;

        if (Array.isArray(data)) {
          setBudgets(data);
        } else {
          console.error("Unexpected response:", data);
          setBudgets([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not load budgets");
        setBudgets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  return (
    <section className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CreateBudget />

        {budgets.map((budget, index) => (
          <BudgetItem key={budget._id || index} budget={budget} />
        ))}
      </div>
    </section>
  );
}

export default BudgetList;
