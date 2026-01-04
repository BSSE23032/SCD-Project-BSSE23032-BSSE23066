import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createBooking = asyncHandler(async (req, res) => {
  console.log("BOOKING BODY:", req.body);

  const { name, email, phone, date, residencyId } = req.body;

  if (!name || !email || !phone || !date || !residencyId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // 🔹 Validate property exists
  const residency = await prisma.residency.findUnique({
    where: { id: residencyId },
  });

  if (!residency) {
    res.status(404);
    throw new Error("Property not found");
  }

  const booking = await prisma.booking.create({
    data: {
      name,
      email,
      phone,
      visitDate: new Date(date),
      residencyId,
    },
  });

  res.status(201).json({
    message: "Visit booked successfully",
    booking,
  });
});

export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const bookingsWithProperty = await Promise.all(
    bookings.map(async (b) => {
      const residency = await prisma.residency.findUnique({
        where: { id: b.residencyId },
        select: {
          title: true,
          address: true,
          city: true,
          country: true,
        },
      });

      return {
        ...b,
        property: residency,
      };
    })
  );

  res.json(bookingsWithProperty);
});




// 🔹 GET SINGLE BOOKING BY ID
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json(booking);
});
