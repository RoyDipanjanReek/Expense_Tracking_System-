import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ id, refreshData }) {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !amount) return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);

    try {
      const responce = await fetch(`/api/createExpense/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!responce.ok) {
        // Log the error response for debugging
        const errorText = await responce.text();
        console.error("Server error:", errorText);
        throw new Error("Failed to create Budget");
      }

      const data = await responce.json();
      if (data) {
        refreshData()
        toast("New Budget Created!");
      }
    } catch (error) {
      console.log("Failed to create budget", error);
      alert("Failed to create budget");
    }
    
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border p-5 rounded-lg bg-slate-100"
    >
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Home Decor"
          className="input"
          required
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 5000$"
          className="input"
          required
        />
      </div>
      <Button
        disabled={!(name && amount)}
        type="submit"
        className="mt-5 w-full"
      >
        Add New Expense
      </Button>
    </form>
  );
}

export default AddExpense;
