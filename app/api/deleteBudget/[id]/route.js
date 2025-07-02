import dbConnect from "@/app/db/dbConfig";
import Expenses from "@/app/models/Expenses.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Budget from "@/app/models/Budget.model";

export async function DELETE(req, context) {
  try {
    const { params } = context;
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();

    const deleteExpence = await Expenses.find({budgetId: id})

    await Expenses.deleteMany({budgetId: id})


    const deleteBudget = await Budget.findByIdAndDelete({
      _id: id
    });

    // const deleteTotalBudgetAndExpenses = await Budget.aggregate([
    //   [
    //     {
    //       $lookup: {
    //         from: "expenses",
    //         localField: "_id",
    //         foreignField: "budgetId",
    //         as: "data",
    //       },
    //     },
    //   ],
    // ]);

    // await Budget.deleteMany({_id : {$in: deleteTotalBudgetAndExpenses}})

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
          { error: error.message || "Something went wrong in getting budgets" },
          { status: 500 }
        );
  }
}
