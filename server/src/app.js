import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from './routes/auth.js';

dotenv.config();

const app=express();


//middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

//Routes
app.get("/",(req,res)=>{
    res.send("server is running!");
});

app.use("/api/auth",authRoutes);


export default app;