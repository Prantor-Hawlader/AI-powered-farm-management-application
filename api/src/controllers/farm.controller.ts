import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import {
  CreateFarmInput,
  UpdateFarmInput,
} from "../validators/farm.validator.js";

export const createFarm = async (req: Request, res: Response) => {
  try {
    const { name, location, size, soilType, climate } =
      req.body as CreateFarmInput;

    const farm = await prisma.farm.create({
      data: {
        name,
        location,
        size,
        soilType: soilType || null,
        climate: climate || null,
        userId: req.user!.id,
      },
    });

    res.status(201).json({
      message: "Farm created successfully! 🌾",
      farm,
    });
  } catch (error) {
    console.error("Create farm error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getMyFarms = async (req: Request, res: Response) => {
  try {
    const farms = await prisma.farm.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: "desc" },
    });

    res.json({ farms });
  } catch (error) {
    console.error("Get farms error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getFarmById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const farm = await prisma.farm.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!farm) {
      res.status(404).json({ message: "Farm not found." });
      return;
    }

    res.json({ farm });
  } catch (error) {
    console.error("Get farm error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateFarm = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body as UpdateFarmInput;

    const existingFarm = await prisma.farm.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!existingFarm) {
      res.status(404).json({ message: "Farm not found." });
      return;
    }

    const farm = await prisma.farm.update({
      where: { id },
      data,
    });

    res.json({
      message: "Farm updated successfully! ✏️",
      farm,
    });
  } catch (error) {
    console.error("Update farm error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteFarm = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existingFarm = await prisma.farm.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!existingFarm) {
      res.status(404).json({ message: "Farm not found." });
      return;
    }

    await prisma.farm.delete({
      where: { id },
    });

    res.json({ message: "Farm deleted successfully! 🗑️" });
  } catch (error) {
    console.error("Delete farm error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
