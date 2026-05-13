import "dotenv/config";
import express from "express"
import cors from "cors"
import { connectDB, disconnectDB } from "./config/db.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import ApiError from "./utils/ApiError.js";


// server port 
const app = express();
if (!process.env.PORT) {
    throw new ApiError(400, "PORT is not defined")
}
const port = process.env.PORT;




// Database connection
connectDB();
// Cloudinary Connection
connectCloudinary();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Routes
app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});


// handle unhandled peomise rejection
process.on("unhandledRejection", (error) => {
    console.log(`Unhandled Rejection: ${error.message}`);
    disconnectDB();
    process.exit(1);
});

// handle uncaught exception
process.on("uncaughtException", (error) => {
    console.log(`Uncaught Exception: ${error.message}`);
    disconnectDB();
    process.exit(1);
});

// handle server shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    disconnectDB();
    process.exit(0);
});
