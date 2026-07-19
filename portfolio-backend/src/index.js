import dotenv from "dotenv"
dotenv.config({
    path: './env'
})
import connectDB from "./db/index.js";
import { app } from "./app.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const port = process.env.PORT || 8000;

const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
};

if (process.env.MONGODB_URI) {
    connectDB()
        .then(() => {
            startServer();
        })
        .catch((err) => {
            console.log("MONGO db connection failed. Starting without DB.", err.message);
            startServer();
        });
} else {
    console.log("MONGODB_URI not set. Starting without DB.");
    startServer();
}












/*
import express from "express"
const app = express();

(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        application.on("error", (error) => {
            console.log("ERROR:", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listing on port${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR:", error);
        throw err
    }
}){}

*/
