import {z} from 'zod'
import {createZodDto} from "nestjs-zod";

export const CreatePostSchema = z.object({
  caption: z.string(),
  location: z.object({
    lat: z.number(),
    long: z.number(),
  })
})

export const UpdatePostSchema = z.object({
  post_id: z.string(),
  caption: z.string().optional(),
  location: z.object({
    lat: z.number().optional(),
    long: z.number().optional(),
  }).optional(),
})

export class UpdatePostDto extends createZodDto(UpdatePostSchema) {
}

export class CreatePostDto extends createZodDto(CreatePostSchema) {
}
