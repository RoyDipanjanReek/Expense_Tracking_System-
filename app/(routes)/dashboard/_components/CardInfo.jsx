import { IndianRupee, PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetDetails }) {

    const [totalBudget, setTotalBudget] = useState(0) 
    const [totalSpend, setTotalSpend] = useState(0) 

    const calculateCardInfo = () => {
        console.log(budgetDetails);
        let total_Budget = 0
        let total_Spend = 0

        budgetDetails.forEach(element => {
            total_Budget = total_Budget + Number(element.amount)
            total_Spend = total_Spend + element.totalSpend
        });

        setTotalBudget(total_Budget)
        setTotalSpend(total_Spend)
        console.log("Total budget are here",total_Budget, total_Spend);
        
    }

      useEffect(() => {
        budgetDetails && calculateCardInfo()
      },[budgetDetails])
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="p-7 border-4 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm ">Total Budget </h2>
          <h2 className="font-bold text-2xl flex items-center"><IndianRupee /> {totalBudget}</h2>
        </div>
        <PiggyBank className="bg-[#ED3500] p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border-4 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm ">Total Spend </h2>
          <h2 className="font-bold text-2xl flex items-center"><IndianRupee />  {totalSpend}</h2>
        </div>
        <ReceiptText className="bg-[#ED3500] p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border-4 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm ">No. Of Budget </h2>
          <h2 className="font-bold text-2xl">{budgetDetails?.length}</h2>
        </div>
        <Wallet className="bg-[#ED3500] p-3 h-12 w-12 rounded-full text-white" />
      </div>
    </div>
  );
}

export default CardInfo;
