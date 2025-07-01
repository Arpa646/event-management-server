import { IEvent } from './event.interface';
import { EventModel } from './event.model';
import { UserRegModel } from '../Registration/user.model';

// Create a new event
const createEventIntoDB = async (payload: Partial<IEvent>, userId: string) => {
  // Get user details for postedByName
  const user = await UserRegModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  const eventData = {
    ...payload,
    createdBy: userId,
    postedByName: user.name,
    attendeeCount: 0,
    attendees: []
  };

  const result = await EventModel.create(eventData);
  return result;
};

// Get all events with sorting (newest first)
const getAllEventsFromDB = async (query: any) => {
  const { search, today, week, month, startDate, endDate } = query;
  
  let matchCondition: any = {};

  // Search functionality
  if (search) {
    matchCondition.title = { $regex: search, $options: 'i' };
  }

  // Date filtering
  if (today) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    matchCondition.date = { $gte: todayStart, $lte: todayEnd };
  }

  if (week) {
    const now = new Date();
    let startOfWeek, endOfWeek;

    if (week === 'current') {
      startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    } else if (week === 'last') {
      startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
      endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 1));
    }
    startOfWeek?.setHours(0, 0, 0, 0);
    endOfWeek?.setHours(23, 59, 59, 999);
    matchCondition.date = { $gte: startOfWeek, $lte: endOfWeek };
  }

  if (month) {
    const now = new Date();
    let startOfMonth, endOfMonth;

    if (month === 'current') {
      startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (month === 'last') {
      startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    }
    startOfMonth?.setHours(0, 0, 0, 0);
    endOfMonth?.setHours(23, 59, 59, 999);
    matchCondition.date = { $gte: startOfMonth, $lte: endOfMonth };
  }

  // Custom date range
  if (startDate && endDate) {
    matchCondition.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const result = await EventModel.find(matchCondition)
    .sort({ date: -1, time: -1 });
  
  return result;
};

// Get single event
const getSingleEventFromDB = async (id: string) => {
  const result = await EventModel.findById(id)
    .populate('attendees', 'name email');
  return result;
};

// Update event
const updateEventIntoDB = async (id: string, payload: Partial<IEvent>) => {
  const result = await EventModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete event
const deleteEventFromDB = async (id: string) => {
  const result = await EventModel.findByIdAndDelete(id);
  return result;
};

// Join event
const joinEventIntoDB = async (eventId: string, userId: string) => {
  const event = await EventModel.findById(eventId);
  if (!event) {
    throw new Error('Event not found');
  }

  // Check if user already joined
  if (event.attendees.includes(userId as any)) {
    throw new Error('You have already joined this event');
  }

  // Add user to attendees and increment count
  const result = await EventModel.findByIdAndUpdate(
    eventId,
    {
      $push: { attendees: userId },
      $inc: { attendeeCount: 1 }
    },
    { new: true }
  );

  return result;
};

// Get events by createdById (user's own events)
const getEventsByCreatedByIdFromDB = async (createdById: string, query: any) => {
  const { search, today, week, month, startDate, endDate } = query;
  
  let matchCondition: any = { createdBy: createdById };

  // Search functionality
  if (search) {
    matchCondition.title = { $regex: search, $options: 'i' };
  }

  // Date filtering
  if (today) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    matchCondition.date = { $gte: todayStart, $lte: todayEnd };
  }

  if (week) {
    const now = new Date();
    let startOfWeek, endOfWeek;

    if (week === 'current') {
      startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    } else if (week === 'last') {
      startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
      endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 1));
    }
    startOfWeek?.setHours(0, 0, 0, 0);
    endOfWeek?.setHours(23, 59, 59, 999);
    matchCondition.date = { $gte: startOfWeek, $lte: endOfWeek };
  }

  if (month) {
    const now = new Date();
    let startOfMonth, endOfMonth;

    if (month === 'current') {
      startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (month === 'last') {
      startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    }
    startOfMonth?.setHours(0, 0, 0, 0);
    endOfMonth?.setHours(23, 59, 59, 999);
    matchCondition.date = { $gte: startOfMonth, $lte: endOfMonth };
  }

  // Custom date range
  if (startDate && endDate) {
    matchCondition.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const result = await EventModel.find(matchCondition)
    .sort({ date: -1, time: -1 })
    .populate('attendees', 'name email');
  
  return result;
};

export const EventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  updateEventIntoDB,
  deleteEventFromDB,
  joinEventIntoDB,
  getEventsByCreatedByIdFromDB,
}; 