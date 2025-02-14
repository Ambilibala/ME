import express, { Request, Response, Router } from "express";
import Event from "../models/eventModel";

const router: Router = express.Router();

// Route to create a new event
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, name, address, state, city, dateTime } = req.body;

    if (!eventId || !name || !address || !state || !city || !dateTime) {
      res.status(400).json({ error: "All required fields must be provided" });
      return;
    }

    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    console.log("✅ Event saved successfully:", savedEvent);
    res.status(201).json(savedEvent);
  } catch (error: any) {
    console.error("❌ Error saving event:", error.message);
    if (error.code === 11000) {
      res.status(400).json({ error: "Event ID must be unique" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch all events
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find();
    console.log(`✅ Fetched ${events.length} events`);
    res.status(200).json(events);
  } catch (error: any) {
    console.error("❌ Error fetching events:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;



