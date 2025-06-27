import mongoose from "mongoose"

const budgetSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    emoji: {
        type: String
    }

}, {timestamps: true})

const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema)
export default Budget