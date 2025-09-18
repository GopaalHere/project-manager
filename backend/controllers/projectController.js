import Project from '../models/Project.js';

export const addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json({ success: true, message: "project added", result: project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding project", error: err.message });
  }
};

export const getProjects = async(req,res)=>{
   try{
    const projects = await Project.find();
    res.json({success:true,message:"Projects fetched",result:projects})
   }catch(err){
    res.json({success:false,message:"Projects couldn't be fetched",error:err.message})
   }
}

export const deleteProject = async(req,res)=>{
  try{
    const project = await Project.findByIdAndDelete(req.params.id);
    res.json({success:true,message:"Project Deleted Successfully",result:project})
  }catch(err){
    res.json({success:false,message:"couldn't delete the project",error:err.message})
  }
}

export const getOneProject=async(req,res)=>{
  try{
    const project = await Project.findById(req.params.id);
    res.json({success:true,message:"One Project Fetched",result:project})
  }catch(err){
    res.json({message:false,message:"Couldn't get the project",error:err.message})
  }
}

export const updateProject=async(req,res)=>{
  try{
    const {id} = req.params;
    const updateData = req.body;
    const project = await Project.findByIdAndUpdate(id,updateData,{new:true});
    if(!project){
      return res.status(404).json({success:false,message:"Project not found"})
    }
    res.json({success:true,message:"Project Data Updated",result:project})
  }catch(err){
    res.json({success:false,message:"Couldn't update the data",error:err.message})
  }
}