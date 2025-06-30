import dbConnect from "@/app/db/dbConfig";
import Expenses from "@/app/models/Expenses.model";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request, {params }) {
  try {
    const { id } = await params ;
    console.log("Params ID is here",id);
     const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 404 });
    }

    await dbConnect();

    const formData = await request.formData();
    const name = formData.get("name");
    const amount = formData.get("amount");

    if (!name || !amount) {
      return NextResponse.json(
        { error: "Name and amount are required" },
        { status: 400 }
      );
    }

    const saveNewExpenses = new Expenses({
      name,
      amount,
      budgetId: new mongoose.Types.ObjectId(id),
      userId
    });

    await saveNewExpenses.save();

    return NextResponse.json({
      message: "New Expence Created Successfully",
      data: saveNewExpenses,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong in create budget" },
      { status: 500 }
    );
  }
}
