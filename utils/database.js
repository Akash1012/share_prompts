import mongoose from "mongoose";

let isConnected = false; // track the connection status

// console.log("process.env.MONGODB_URI akash 1", process.env.MONGODB_URI);
// console.log("process.env.MONGODB_URI akash 2", process.env.GOOGLE_CLIENT_ID);
// console.log(
//   "process.env.MONGODB_URI akash 3",
//   process.env.GOOGLE_CLIENT_SECRET
// );

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
};

if (isConnected) {
  console.log("MongoDB is already connected");
}

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "share_prompt",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
  isConnected = true;
} catch (error) {
  console.log(error);
}
