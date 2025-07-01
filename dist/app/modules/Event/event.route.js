"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("./event.controller");
const validateroute_1 = __importDefault(require("../../middleware/validateroute"));
const event_validation_1 = require("./event.validation");
const router = express_1.default.Router();
// Create event (authenticated users only)
router.post('/', 
// auth(USER_ROLE.user, USER_ROLE.admin),
(0, validateroute_1.default)(event_validation_1.EventValidation.createEventValidationSchema), event_controller_1.EventControllers.createEvent);
// Get all events (authenticated users only)
router.get('/', 
// auth(USER_ROLE.user, USER_ROLE.admin),
event_controller_1.EventControllers.getAllEvents);
// Get my events (events created by the authenticated user)
router.get('/my-events', 
// auth(USER_ROLE.user),
event_controller_1.EventControllers.getMyEvents);
// Get events by specific user ID
router.get('/user/:userId', 
// auth(USER_ROLE.user, USER_ROLE.admin),
event_controller_1.EventControllers.getMyEvents);
// Get single event (authenticated users only)
router.get('/:id', 
// auth(USER_ROLE.user, USER_ROLE.admin),
event_controller_1.EventControllers.getSingleEvent);
// Update event (authenticated users only)
router.put('/:id', 
// auth(USER_ROLE.user, USER_ROLE.admin),
(0, validateroute_1.default)(event_validation_1.EventValidation.updateEventValidationSchema), event_controller_1.EventControllers.updateEvent);
// Delete event (authenticated users only)
router.delete('/:id', 
// auth(USER_ROLE.user, USER_ROLE.admin),
event_controller_1.EventControllers.deleteEvent);
// Join event (authenticated users only)
router.patch('/:eventId/join/:userId', 
// auth(USER_ROLE.user, USER_ROLE.admin),
event_controller_1.EventControllers.joinEvent);
exports.EventRoutes = router;
