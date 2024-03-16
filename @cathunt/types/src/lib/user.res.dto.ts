import {z} from 'zod'

export const GetProfileResponseSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  bio: z.string().optional().default(null),
  location: z.string().optional().default(null),
})
