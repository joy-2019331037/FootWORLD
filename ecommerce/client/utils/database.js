import mongoose from "mongoose";
export default async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongoDB:mongoDB@cluster0.gvjc6nn.mongodb.net/buy?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log("error on connecting to DB");
  }
}
