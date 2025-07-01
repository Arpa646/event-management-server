"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventControllers = void 0;
const event_services_1 = require("./event.services");
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Create event
const createEvent = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // For testing: accept userId from request body, in production use req.user?.userId
    const userId = req.body.createdBy || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    console.log("userID", userId);
    if (!userId) {
        return (0, response_1.default)(res, {
            statusCode: http_status_codes_1.default.BAD_REQUEST,
            success: false,
            message: 'User ID is required',
            data: null,
        });
    }
    const result = yield event_services_1.EventServices.createEventIntoDB(req.body, userId);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'Event created successfully',
        data: result,
    });
}));
// Get all events
const getAllEvents = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_services_1.EventServices.getAllEventsFromDB(req.query);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Events retrieved successfully',
        data: result,
    });
}));
// Get single event
const getSingleEvent = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_services_1.EventServices.getSingleEventFromDB(id);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Event retrieved successfully',
        data: result,
    });
}));
// Update event
const updateEvent = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_services_1.EventServices.updateEventIntoDB(id, req.body);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Event updated successfully',
        data: result,
    });
}));
// Delete event
const deleteEvent = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield event_services_1.EventServices.deleteEventFromDB(id);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Event deleted successfully',
        data: null,
    });
}));
// Join event
const joinEvent = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, userId } = req.params;
    if (!userId) {
        return (0, response_1.default)(res, {
            statusCode: http_status_codes_1.default.BAD_REQUEST,
            success: false,
            message: 'User ID is required',
            data: null,
        });
    }
    if (!eventId) {
        return (0, response_1.default)(res, {
            statusCode: http_status_codes_1.default.BAD_REQUEST,
            success: false,
            message: 'Event ID is required',
            data: null,
        });
    }
    const result = yield event_services_1.EventServices.joinEventIntoDB(eventId, userId);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Successfully joined the event',
        data: result,
    });
}));
// Get events by createdById (user's own events)
const getMyEvents = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) || req.params.userId;
    console.log("userId", userId);
    if (!userId) {
        return (0, response_1.default)(res, {
            statusCode: http_status_codes_1.default.BAD_REQUEST,
            success: false,
            message: 'User ID is required',
            data: null,
        });
    }
    const result = yield event_services_1.EventServices.getEventsByCreatedByIdFromDB(userId, req.query);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Your events retrieved successfully',
        data: result,
    });
}));
exports.EventControllers = {
    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    joinEvent,
    getMyEvents,
};
