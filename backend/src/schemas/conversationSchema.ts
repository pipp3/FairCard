import {z} from 'zod';

export const conversationSchema = z.object({
  listingId: z.string().min(1, 'Listing ID is required')
});