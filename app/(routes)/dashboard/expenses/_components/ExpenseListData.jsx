import axios from "axios";
import { LucideTrash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListData({ expenceData, refreshData }) {
  const handleDelete = async (id) => {
    const responce = await axios.delete(`/api/deleteExpence/${id}`);

    const data = await responce.data;
    if (data.success) {
      toast("Expense Deleted");
    } else {
      toast("Failed to delete");
    }
    refreshData();
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name </h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date </h2>
        <h2 className="font-bold">Action </h2>
      </div>
      {expenceData.map((expence, index) => (
        <div key={expence._id} className="grid grid-cols-4 p-2">
          <h2>{expence.name} </h2>
          <h2>{expence.amount}</h2>
          <h2>{new Date(expence.createdAt).toLocaleDateString()} </h2>
          <h2>
            <LucideTrash2
              onClick={() => handleDelete(expence._id)}
              className="text-red-500 cursor-pointer"
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListData;
