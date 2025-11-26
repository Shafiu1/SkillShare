import app from './src/app.js';
import mongoose from 'mongoose';
const PORT = process.env.PORT || 4000;
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("❌ MongoDB connection failed:", err));
