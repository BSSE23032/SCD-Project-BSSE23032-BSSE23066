import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
} from "../controllers/bookingCntrl.js";

const router = express.Router();

// ✅ STATIC ROUTES FIRST
router.post("/book", createBooking);
router.get("/", getBookings);

// ❗ DYNAMIC ROUTE LAST (VERY IMPORTANT)
router.get("/:id", getBookingById);

export default router;
