//const express = require("express")
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import User from "./models/user.model.js"
import {connectDB} from "./lib/db.js"
import { clerkMiddleware } from "@clerk/clerk-sdk-node";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({origin: FRONTEND_URL, credentials: true})); // Enable CORS for all routes
app.use(clerkMiddleware()); 

app.get("/health", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
 
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});