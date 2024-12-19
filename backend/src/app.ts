import express from "express";
import dotenv from 'dotenv'

dotenv.config();
import connectDB from "./configs/db";
import cookieParser from 'cookie-parser';
import router from "./routes/appRoutes";
import cors from 'cors';

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true // If you need cookies/auth headers
}));

app.use("/api", router);

app.listen(port, () => {
    console.log(`Now listening on port localhost:${port}`);
});