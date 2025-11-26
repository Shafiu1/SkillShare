import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';
const router = express.Router();

router.post("/register", async (req,res)=>{
    try{
        const {name , email, password,role}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({message:"Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hash =await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            passwordHash:hash,
            role
        });

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.status(201).json({
            user:{id:user._id,name:user.name,email:user.email,role:user.role},
            token
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
});

//login
router.post("/login", async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password,user.passwordHash);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.json({
            user:{id:user._id,name:user.name,email:user.email,role:user.role},
            token
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
});

router.get("/me", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-passwordHash");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;