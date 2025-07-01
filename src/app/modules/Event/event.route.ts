import express from 'express';
import { EventControllers } from './event.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Registration/user.constant';
import validatereq from '../../middleware/validateroute';
import { EventValidation } from './event.validation';

const router = express.Router();

// Create event (authenticated users only)
router.post(
  '/',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  validatereq(EventValidation.createEventValidationSchema),
  EventControllers.createEvent
);

// Get all events (authenticated users only)
router.get(
  '/',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  EventControllers.getAllEvents
);

// Get my events (events created by the authenticated user)
router.get(
  '/my-events',
  // auth(USER_ROLE.user),
  EventControllers.getMyEvents
);

// Get events by specific user ID
router.get(
  '/user/:userId',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  EventControllers.getMyEvents
);

// Get single event (authenticated users only)
router.get(
  '/:id',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  EventControllers.getSingleEvent
);

// Update event (authenticated users only)
router.put(
  '/:id',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  validatereq(EventValidation.updateEventValidationSchema),
  EventControllers.updateEvent
);

// Delete event (authenticated users only)
router.delete(
  '/:id',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  EventControllers.deleteEvent
);

// Join event (authenticated users only)
router.patch(
  '/:eventId/join/:userId',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  EventControllers.joinEvent
);

export const EventRoutes = router; 