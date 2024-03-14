import {z} from 'zod'
import {createZodDto} from "nestjs-zod";

export const CreateCommentSchema = z.object({
  content: z.string(),
})

export const UpdateCommentSchema = z.object({
  content: z.string(),
})

export class UpdateCommentDto extends createZodDto(UpdateCommentSchema) {
}

export class CreateCommentDto extends createZodDto(CreateCommentSchema) {
}
