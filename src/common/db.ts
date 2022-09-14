import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      (process.env.MONGO_URI ||
        "mongodb+srv://Hayato:111222111222@cluster0.yneej8r.mongodb.net/TEST?retryWrites=true&w=majority") as string
    );
    console.log("DB Connected!");
  } catch (e) {
    console.log("DB connnection failed!");
    process.exit(1);
  }
};

export default connectDB;
