import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const { name, amount, totalSpend, totalItem, emoji } = budget;

  console.log("Budget name",name);
  
  const calculateProgressBarPercent = () => {
    const percentResult = (budget.totalSpend / budget.amount)*100

    return percentResult.toFixed(2)
  }

  return (
    <Link 
    href={`/dashboard/expenses/${budget._id}`} 
    className="p-5 border rounded-lg gap-2 flex flex-col hover:shadow-md cursor-pointer h-[170px]">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl p-2 bg-slate-100 rounded-full gap-4">
            {"D"}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-600">{budget.totalItem} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-blue-600 text-lg">${budget.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-600">
            ${budget.totalSpend ? budget.totalSpend : 0} Spend
          </h2>
          <h2 className="text-xs text-slate-600">
            ${budget.amount - budget.totalSpend} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
          style={{
            width: `${calculateProgressBarPercent()}%`
          }} 
          className="bg-black h-2 rounded-full"></div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
