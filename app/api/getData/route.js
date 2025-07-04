import dbConnect from "@/app/db/dbConfig";
import Budget from "@/app/models/Budget.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const getBudgetList = await Budget.aggregate([
      {
        $match: { clerkId: userId }
      },
      {
        $lookup: {
          from: "expenses", 
          localField: "_id",
          foreignField: "budgetId",
          as: "expenses"
        }
      },
      {
        $addFields: {
          totalSpend: { $sum: "$expenses.amount" },
          totalItem: { $size: "$expenses" }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);
    
    return NextResponse.json(getBudgetList);


  } catch (error) {
    // Log the error for debugging
    console.error("Error in GET /api/getData:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong in getting budgets" },
      { status: 500 }
    );
  }
}
