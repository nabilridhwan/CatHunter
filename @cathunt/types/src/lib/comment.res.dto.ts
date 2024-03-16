import {z} from 'zod'
import {createZodDto} from "nestjs-zod";


export const PostCommentsResponseSchema = z.array(z.object({
  comment_id: z.string(),
  post_id: z.string(),
  user_id: z.string(),
  comment: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  user: z.object({
    username: z.string(),
    name: z.string(),
  })
}))
