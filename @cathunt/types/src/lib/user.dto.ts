import {z} from 'zod'
import {createZodDto} from "nestjs-zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(255),
  username: z.string(),
  bio: z.string().optional().default(null),
  country: z.string().optional().default(null),
})

export const UpdateUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  username: z.string().optional(),
  bio: z.string().optional(),
  country: z.string().optional(),
})

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {
}

export class CreateUserDto extends createZodDto(CreateUserSchema) {
}
