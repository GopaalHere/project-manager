import express from 'express';
import { addProject,deleteProject,getOneProject,getProjects, updateProject } from '../controllers/projectController.js';
import { verifyJWTToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/add-project",verifyJWTToken, addProject);
router.get("/get-projects",verifyJWTToken, getProjects);
router.delete("/delete/:id",verifyJWTToken, deleteProject);
router.get("/:id",verifyJWTToken, getOneProject);
router.put("/update/:id",verifyJWTToken, updateProject);
export default router;