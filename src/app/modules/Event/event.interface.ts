import { Types } from 'mongoose';

export interface IEvent {
  title: string;
  createdBy: Types.ObjectId;
  postedByName?: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  attendeeCount: number;
  attendees: Types.ObjectId[];
} 