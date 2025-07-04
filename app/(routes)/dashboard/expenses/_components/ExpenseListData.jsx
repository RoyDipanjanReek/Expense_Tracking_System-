import { Button } from "@/components/ui/button";
import axios from "axios";
import { LucideTrash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import EditExpence from "./EditExpence";

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
    <div className="mt-3 ">
      <div className="grid grid-cols-4 odd:bg-gray-400 p-2">
        <h2 className="font-bold">Name </h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date </h2>
        <h2 className="font-bold">Action </h2>
      </div>
      {expenceData.map((expence, index) => (
        <div
          key={expence._id}
          className="grid grid-cols-4 p-2 odd:bg-gray-400 hover:bg-gray-400"
        >
          <h2>{expence.name} </h2>
          <h2>{expence.amount}</h2>
          <h2>{new Date(expence.createdAt).toLocaleDateString()} </h2>

           <div className="flex gap-1 items-center">
            <Button
              className="bg-red-500 px-5"
              onClick={() => handleDelete(expence._id)}
            >
              <LucideTrash2 className=" cursor-pointer" />
              <span className="hidden md:inline text-white">
              Delete
              </span>
            </Button>
            <div>
              <EditExpence />
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default ExpenseListData;
