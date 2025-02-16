import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the event schema
interface IEvent extends Document {
  eventId: string;
  name: string;
  address: string;
  state: string;
  city: string;
  date: Date;
  time: string;
}

// Define the schema
const eventSchema = new Schema<IEvent>(
  {
    eventId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Create and export the model
const Event: Model<IEvent> = mongoose.model<IEvent>("Event", eventSchema);

export default Event;