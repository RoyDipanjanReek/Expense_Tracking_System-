import React from "react";
import CreateBudget from "./CreateBudget";

function BudgetList() {
  const getBudgetList = async () => {
    
  }
  return (
    <section className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget  />
      </div>
    </section>
  );
}

export default BudgetList;

