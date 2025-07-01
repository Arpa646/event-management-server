"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    postedByName: { type: String, required: false },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    attendeeCount: { type: Number, default: 0 },
    attendees: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
});
exports.EventModel = (0, mongoose_1.model)('Event', eventSchema);
