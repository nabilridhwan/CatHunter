import {z} from 'zod'
import {createZodDto} from "nestjs-zod";

export const CreateUserSchema = z.object({
  username: z.string(),
  bio: z.string(),
  country: z.string(),
})

export class CreateUserDto extends createZodDto(CreateUserSchema) {
}
