import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConfig";
import Expenses from "@/app/models/Expenses.model";
import mongoose from "mongoose";

export async function GET(request, context) {
  try {
    const { params } = context;
    const { id } = await params;
    console.log("Params id from getExpence route is:--",id);
    
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 404 });
    }

    await dbConnect();

    const getExpenseList = await Expenses.aggregate([
        {
            $match: {
                budgetId: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $sort:{createdAt: -1}
        }
    ])

    return NextResponse.json(getExpenseList);
  } catch (error) {
    console.error("Error in GET /api/getData:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong in getting budgets" },
      { status: 500 }
    );
  }
}