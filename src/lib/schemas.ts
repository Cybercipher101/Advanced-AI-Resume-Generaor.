import { z } from 'zod';

export const chatMessageSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'model', 'system']),
    content: z.string().min(1)
  })).min(1)
});

export const atsFeedbackSchema = z.object({
  content: z.string().min(1, "Content cannot be empty.")
});

export const generateResumeSchema = z.object({
  profile: z.string().min(10, "Please provide more detail.")
});
