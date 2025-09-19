import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const login = async (req,res)=>{
    const{email,password} = req.body;
    if(!email || !password) return res.status(400).json({success:false,message:"Email & password required"});

    const user = await User.findOne({email,password});
    if(!user) return res.status(404).json({success:false,message:"User not found"});

    const token = jwt.sign(
    {id:user._id,email:user.email},
    process.env.JWT_SECRET,
    {expiresIn:"5d"});

    res.cookie("token",token,
    {httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:process.env.NODE_ENV==="production"?"none":"lax",
  })
  res.json({success:true,message:"Login successful",token});
};

export const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Email & password required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ success: false, message: "User already exists" });

  const newUser = await User.create({ email, password });
  const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "5d" });

  res.cookie("token", token, { httpOnly: true,secure:process.env.NODE_ENV==="production",sameSite:process.env.NODE_ENV==="production"?"none":"lax",}).json({ success: true, message: "Signup successful", token });
};


