import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/dbconfig.js";
import studentRoutes from "./routes/student.route.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/*Routes of applications */

app.use("/student",studentRoutes);

const port = process.env.PORT || 9090;

app.listen(port, () => {
    console.log(`Server is running on PORT :: ${port}`);
    connectDB();
});
