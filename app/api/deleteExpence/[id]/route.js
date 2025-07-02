import dbConnect from "@/app/db/dbConfig";
import Expenses from "@/app/models/Expenses.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    const { params } = context;
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect()
    const deleteExpence = await Expenses.findByIdAndDelete({
      _id:  id,
      userId:userId
    })

    if (!deleteExpence) {
      return NextResponse.json({ error: "Expense ID not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something wrong in detele expence" },
      { status: 500 }
    );
  }
}
