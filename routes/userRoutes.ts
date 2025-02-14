import express, { Request, Response, Router } from "express";
import User from "../models/userRegister";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      phone,
      email,
      occupation,
      organizationName,
      role,
      blood,
      preferredAreas,
    } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !occupation ||
      !organizationName ||
      !role ||
      !blood ||
      !preferredAreas
    ) {
      res.status(400).json({ error: "All required fields must be provided" });
      return;
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log("✅ User saved successfully:", savedUser);
    res.status(201).json(savedUser);
  } catch (error: any) {
    console.error("❌ Error saving user:", error.message);
    if (error.code === 11000) {
      res.status(400).json({ error: "Phone or email already exists" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    console.log(`✅ Fetched ${users.length} users`);
    res.status(200).json(users);
  } catch (error: any) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
