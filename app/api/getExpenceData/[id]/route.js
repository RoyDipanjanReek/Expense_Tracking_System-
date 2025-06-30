import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConfig";
import Expenses from "@/app/models/Expenses.model";
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 404 });
    }

    await dbConnect();

    const getExpenseList = await Expenses.aggregate([
        {
            $match: {
                budgetId: id
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
