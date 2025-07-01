import { z } from 'zod';

const createEventValidationSchema = z.object({
  body: z.object({
  
  
 
  }),
});

const updateEventValidationSchema = z.object({
  body: z.object({
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

export const EventValidation = {
  createEventValidationSchema,
  updateEventValidationSchema,
}; 