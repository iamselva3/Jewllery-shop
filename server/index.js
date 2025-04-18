import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import router from "./Route/userroute.js";
import productroute from "./Route/productroute.js";
import product1 from "./Route/product1route.js";
import product2 from "./Route/product2route.js";
import searchrouter from "./Route/searchroute.js";


const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
mongoose.connect(MONGOURL)
    .then(() => {
        console.log("MongoDB connection successful");
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use("/api", router);
app.use("/api",productroute);
app.use("/api",product1);
app.use("/api",product2);
app.use("/api",searchrouter);