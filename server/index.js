import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import bookingRoute from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);
app.use("/api/bookings", bookingRoute);

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
