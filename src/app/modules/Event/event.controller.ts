import { Request, Response } from 'express';
import { EventServices } from './event.services';
import catchAsync from '../../middleware/asynch';
import sendResponse from '../../utils/response';
import httpStatus from 'http-status-codes';

// Create event
const createEvent = catchAsync(async (req: Request, res: Response) => {
  // For testing: accept userId from request body, in production use req.user?.userId
  const userId = req.body.createdBy || req.user?.userId;
  console.log("userID",userId)
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  
  const result = await EventServices.createEventIntoDB(req.body, userId);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

// Get all events
const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getAllEventsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully',
    data: result,
  });
});

// Get single event
const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventServices.getSingleEventFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully',
    data: result,
  });
});

// Update event
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventServices.updateEventIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

// Delete event
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await EventServices.deleteEventFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: null,
  });
});

// Join event
const joinEvent = catchAsync(async (req: Request, res: Response) => {
  const { eventId, userId } = req.params;
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  
  if (!eventId) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Event ID is required',
      data: null,
    });
  }
  
  const result = await EventServices.joinEventIntoDB(eventId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully joined the event',
    data: result,
  });
});

// Get events by createdById (user's own events)
const getMyEvents = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.params.userId;
  console.log("userId",userId)
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }

  const result = await EventServices.getEventsByCreatedByIdFromDB(userId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your events retrieved successfully',
    data: result,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  getMyEvents,
}; 