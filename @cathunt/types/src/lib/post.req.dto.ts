import {z} from 'zod'
import {createZodDto} from "nestjs-zod";

export const GetAllPostsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(20),
  search: z.string().optional(),
  user_id: z.string().optional(),
})

export class GetAllPostsDto extends createZodDto(GetAllPostsSchema) {
}
