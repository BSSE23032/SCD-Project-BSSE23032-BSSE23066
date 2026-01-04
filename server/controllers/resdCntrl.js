import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// CREATE RESIDENCY
export const createResidency = asyncHandler(async (req, res) => {
  console.log("🔥 API HIT");
  console.log("📦 BODY:", req.body);

  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    status,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        status, 
      },
    });

    console.log("✅ SAVED IN DB:", residency);
    res.status(201).json(residency);
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL RESIDENCIES
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(residencies);
});

// GET SINGLE RESIDENCY
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const residency = await prisma.residency.findUnique({
    where: { id },
  });

  res.json(residency);
});
