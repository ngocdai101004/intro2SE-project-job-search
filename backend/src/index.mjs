import express from "express";
import { connectDB } from "./configs/db.mjs";
import User from "./models/user.mjs";
import dotenv from "dotenv";
dotenv.config();
const DB_URI = process.env.DB_URI;
const app = express();
const PORT = process.env.PORT || 3000;

connectDB(DB_URI);

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await User.find({ gender: "male" });

    res.status(200).send({
      message: "Hello World!",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
