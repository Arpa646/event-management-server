"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = void 0;
const zod_1 = require("zod");
const createEventValidationSchema = zod_1.z.object({
    body: zod_1.z.object({}),
});
const updateEventValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
    // title: z.string().optional(),
    // postedByName: z.string().optional(),
    // date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    //   message: 'Invalid date format',
    // }).optional(),
    // time: z.string().optional(),
    // location: z.string().optional(),
    // description: z.string().optional(),
    // attendeeCount: z.number().min(0).optional(),
    }),
});
exports.EventValidation = {
    createEventValidationSchema,
    updateEventValidationSchema,
};
