import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected successfully");
    return;
  }
  try {
    const database = await mongoose.connect(process.env.MongoDB_URI || "", {});
    connection.isConnected = database.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
