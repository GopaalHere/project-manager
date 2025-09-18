import express from 'express';
import { login,signup } from '../controllers/authController.js';
import { verifyJWTToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/login",login);
router.post("/signup", signup);

router.get('/me', verifyJWTToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged out" });
});

export default router;