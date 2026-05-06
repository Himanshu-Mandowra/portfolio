import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import resumeRoutes from "./routes/resume.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//Routes
import userRouter from './routes/user.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/resume", resumeRoutes);

export { app }