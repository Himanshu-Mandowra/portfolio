import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import resumeRoutes from "./routes/resume.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import userRouter from './routes/user.routes.js'
import projectRouter from "./routes/project.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello AWS!!");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//Routes

app.use("/api/v1/users", userRouter)
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/ai", chatRoutes);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/admin", adminRouter);

export { app }
