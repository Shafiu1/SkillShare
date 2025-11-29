import express from "express";
import {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseById
} from "../controllers/courseController.js";

import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected routes (teacher only)
router.post("/", authenticate, authorizeRoles("teacher"), createCourse);
router.put("/:id", authenticate, authorizeRoles("teacher"), updateCourse);
router.delete("/:id", authenticate, authorizeRoles("teacher"), deleteCourse);

export default router;
