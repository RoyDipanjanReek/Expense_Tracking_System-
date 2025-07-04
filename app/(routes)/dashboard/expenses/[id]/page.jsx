"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import axios from "axios";
import AddExpense from "../_components/AddExpense";
import { useParams } from "next/navigation";
import ExpenseListData from "../_components/ExpenseListData";
import { Button } from "@/components/ui/button";
import { PenBox, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditBudget from "../_components/EditBudget";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


function Expences() {
  const [budgets, setBudgets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expence, setExpence] = useState([]);
  const { user } = useUser();
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  

  const fetchBudgetData = async (id) => {
    try {
      const res = await axios("/api/getData");
      const data = await res.data;

      const matchedItem = data.find((item) => item._id === id);

      if (matchedItem) {
        setBudgets(matchedItem);
      } else {
        setBudgets(null);
      }
    } catch (err) {
      console.error("Error fetching budget data:", err);
      setBudgets(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseData = async (id) => {
    try {
      const res = await axios(`/api/getExpenceData/${id}`);
      const data = await res.data;
      if (Array.isArray(data)) {
        setExpence(data);
      } else {
        setExpence([]);
      }
    } catch (error) {
      setExpence([]);
    }
  };

  /*
  Budget Delete API comes here
  **/
  const deleteBudget = async (id) => {

    const responce = await axios.delete(`/api/deleteBudget/${id}`)

    const data = await responce.data
    if (data.success) {
       toast("Budget Deleted");
       router.push("/dashboard/budgets")
       
    }else {
      toast("Failed to delete Budget");
    }
  };

  const editBudget = async () => {
    /*
    Budget Edit (PATCH) API comes here
    **/
  };



  useEffect(() => {
    if (id && user) {
      fetchBudgetData(id);
      fetchExpenseData(id);
    }
  }, [user, id]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
          <EditBudget budgets={budgets}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 bg-destructive p-4 hover:bg-red-700 cursor-pointer">
                <Trash2 className="text-2xl" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your this Budget along with expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteBudget(id)}
                  className="bg-red-500"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
        {loading || !budgets ? (
          <div className="h-[150px] w-full bg-slate-300 rounded-lg animate-pulse" />
        ) : (
          <BudgetItem budget={budgets} />
        )}

        {budgets && (
          <AddExpense
            refreshData={() => fetchBudgetData(id)}
            id={budgets._id}
          />
        )}
      </div>
      <div className="pt-10">
        <ExpenseListData
          refreshData={() => fetchBudgetData(id)}
          expenceData={expence}
        />
      </div>
    </div>
  );
}

export default Expences;
