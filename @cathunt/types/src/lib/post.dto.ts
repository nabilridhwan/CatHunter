import {z} from 'zod'
import {createZodDto} from "nestjs-zod";

export const CreatePostSchema = z.object({
  cat_description: z.string(),
  location: z.object({
    lat: z.number(),
    long: z.number(),
  })
})

export class CreatePostDto extends createZodDto(CreatePostSchema) {
}
