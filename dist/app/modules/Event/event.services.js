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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventServices = void 0;
const event_model_1 = require("./event.model");
const user_model_1 = require("../Registration/user.model");
// Create a new event
const createEventIntoDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user details for postedByName
    const user = yield user_model_1.UserRegModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const eventData = Object.assign(Object.assign({}, payload), { createdBy: userId, postedByName: user.name, attendeeCount: 0, attendees: [] });
    const result = yield event_model_1.EventModel.create(eventData);
    return result;
});
// Get all events with sorting (newest first)
const getAllEventsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, today, week, month, startDate, endDate } = query;
    let matchCondition = {};
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
        }
        else if (week === 'last') {
            startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
            endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 1));
        }
        startOfWeek === null || startOfWeek === void 0 ? void 0 : startOfWeek.setHours(0, 0, 0, 0);
        endOfWeek === null || endOfWeek === void 0 ? void 0 : endOfWeek.setHours(23, 59, 59, 999);
        matchCondition.date = { $gte: startOfWeek, $lte: endOfWeek };
    }
    if (month) {
        const now = new Date();
        let startOfMonth, endOfMonth;
        if (month === 'current') {
            startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        }
        else if (month === 'last') {
            startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        }
        startOfMonth === null || startOfMonth === void 0 ? void 0 : startOfMonth.setHours(0, 0, 0, 0);
        endOfMonth === null || endOfMonth === void 0 ? void 0 : endOfMonth.setHours(23, 59, 59, 999);
        matchCondition.date = { $gte: startOfMonth, $lte: endOfMonth };
    }
    // Custom date range
    if (startDate && endDate) {
        matchCondition.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }
    const result = yield event_model_1.EventModel.find(matchCondition)
        .sort({ date: -1, time: -1 });
    return result;
});
// Get single event
const getSingleEventFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.findById(id)
        .populate('attendees', 'name email');
    return result;
});
// Update event
const updateEventIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete event
const deleteEventFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.findByIdAndDelete(id);
    return result;
});
// Join event
const joinEventIntoDB = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.EventModel.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    // Check if user already joined
    if (event.attendees.includes(userId)) {
        throw new Error('You have already joined this event');
    }
    // Add user to attendees and increment count
    const result = yield event_model_1.EventModel.findByIdAndUpdate(eventId, {
        $push: { attendees: userId },
        $inc: { attendeeCount: 1 }
    }, { new: true });
    return result;
});
// Get events by createdById (user's own events)
const getEventsByCreatedByIdFromDB = (createdById, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, today, week, month, startDate, endDate } = query;
    let matchCondition = { createdBy: createdById };
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
        }
        else if (week === 'last') {
            startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
            endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - 1));
        }
        startOfWeek === null || startOfWeek === void 0 ? void 0 : startOfWeek.setHours(0, 0, 0, 0);
        endOfWeek === null || endOfWeek === void 0 ? void 0 : endOfWeek.setHours(23, 59, 59, 999);
        matchCondition.date = { $gte: startOfWeek, $lte: endOfWeek };
    }
    if (month) {
        const now = new Date();
        let startOfMonth, endOfMonth;
        if (month === 'current') {
            startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        }
        else if (month === 'last') {
            startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        }
        startOfMonth === null || startOfMonth === void 0 ? void 0 : startOfMonth.setHours(0, 0, 0, 0);
        endOfMonth === null || endOfMonth === void 0 ? void 0 : endOfMonth.setHours(23, 59, 59, 999);
        matchCondition.date = { $gte: startOfMonth, $lte: endOfMonth };
    }
    // Custom date range
    if (startDate && endDate) {
        matchCondition.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }
    const result = yield event_model_1.EventModel.find(matchCondition)
        .sort({ date: -1, time: -1 })
        .populate('attendees', 'name email');
    return result;
});
exports.EventServices = {
    createEventIntoDB,
    getAllEventsFromDB,
    getSingleEventFromDB,
    updateEventIntoDB,
    deleteEventFromDB,
    joinEventIntoDB,
    getEventsByCreatedByIdFromDB,
};
