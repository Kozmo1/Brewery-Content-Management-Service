import express from "express";
import cors from "cors";
import dotenv from "dotenv-safe";
import contentRoutes from "./ports/rest/routes/content";
import { config } from "./config/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config({
    allowEmptyValues: true,
    path: `.env.${process.env.NODE_ENV || "local"}`,
    example: ".env.example",
});

const port = config.port;

app.use("healtchekc", (req, res) => {
    res.status(200).send("Now we are cooking, content manager is up and running");
});

app.use("/content", contentRoutes);

app.listen(port, () => {
    console.log(`Content manager is running on port ${port}`);
});