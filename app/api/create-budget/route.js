import dbConnect from "@/app/db/dbConfig";
import Budget from "@/app/models/Budget.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 404 });
    }
    await dbConnect();

    const formData = await request.formData();

    const name = formData.get("name");
    const amount = formData.get("amount");
    const emojiIcon = formData.get("emojiIcon");

    if (!name || !amount) {
      return NextResponse.json(
        { error: "Name and amount are required" },
        { status: 400 }
      );
    }

    //Save to database
    const createdBudget = new Budget({
      name,
      amount,
      emojiIcon,
      clerkId: userId,
    });

    await createdBudget.save();

    return NextResponse.json({
      message: "Budget Created Successfully",
      data: createdBudget,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong in create budget" },
      { status: 500 }
    );
  }
}
