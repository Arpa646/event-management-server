import { Schema, model } from 'mongoose';
import { IEvent } from './event.interface';

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postedByName: { type: String, required: false },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    attendeeCount: { type: Number, default: 0 },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

export const EventModel = model<IEvent>('Event', eventSchema); 