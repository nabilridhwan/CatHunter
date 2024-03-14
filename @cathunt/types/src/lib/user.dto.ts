import {z} from 'zod'
import {createZodDto} from "nestjs-zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(255),
  username: z.string(),
  bio: z.string().optional().default(null),
  country: z.string().optional().default(null),
})

export class CreateUserDto extends createZodDto(CreateUserSchema) {
}
