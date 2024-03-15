import {z} from "zod";

export const PostResponseSchema = z.array(z.object({
  post_id: z.string(),
  user_id: z.string(),
  caption: z.string(),
  lat: z.number(),
  lng: z.number(),
  likes: z.number(),
  comments: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  user: z.object({
    name: z.string(),
    username: z.string()
  })
}))
