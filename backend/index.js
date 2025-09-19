import express from "express";
import {connectDB} from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
const app = express();

dotenv.config();
app.use(express.json());
connectDB();

app.use(
  cors({
    origin:[process.env.CLIENT_URL,"http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser())

//Routes
app.use("/api/auth",authRoutes)
app.use('/api/projects',projectRoutes)


app.get("/", (req, res) => {
    res.send({
        message: "API done",
        success: true,
        name: "Gopal"
    })
})


app.listen(3200)

// const PORT = process.env.PORT || 3200;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });