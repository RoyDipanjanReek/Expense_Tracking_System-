import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    budgetId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget'
    }
}, {timestamps: true});

const Expenses = mongoose.models.Expenses || mongoose.model("Expenses", expensesSchema);
export default Expenses;
