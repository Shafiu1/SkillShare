import jwt from 'jsonwebtoken';

export const authenticate = (req,res,next)=>{
    const header = req.headers.authorization;
    if(!header) return re.status(401),json({message:"No token provided"});

    const token = header.split(" ")[1];
    if(!token) return res.status(401).json({message:"No token provided"});

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user=payload;
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
};

//Role-based middleware

export const authorizeRoles = (...roles)=> (req,res,next)=>{
    if(!roles.includes(req.user.role)) return res.status(403).json({message:"Access denied"});
    next();
};