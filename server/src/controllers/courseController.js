import Course from '../models/Course.js';


//create course

export const createCourse = async (req,res)=>{
    try{
        const {title, description, price, category, thumbnail} = req.body;

        const course = await Course.create({
            title,
            description,
            price,
            category,
            thumbnail,
            instructor: req.user.id
        });

        res.status(201).json({success:true, course});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};

//update course

export const updateCourse = async (req,res)=>{
    try{
        const course = await Course.findById(req.params.id);
        if(!course) return res.status(404).json({message:"Course not found"});

        if(course.instructor.toString()!=req.user.id){
            return res.satus(403).json({message:"Access denied"});
        }

        Object.assign(course,req.body);
        await course.save();

        res.json({success:true,course});
    }catch(err){
        res.status(500).json({message:"Server error"});
    }
}

// DELETE COURSE (teacher only)
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Only instructor can delete
        if (course.instructor.toString() !== req.user.id)
            return res.status(403).json({ message: "Access denied" });

        await course.remove();
        res.json({ success: true, message: "Course deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET ALL COURSES (public)
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        res.json({ success: true, courses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET SINGLE COURSE (public)
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("instructor", "name email");
        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json({ success: true, course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};