import $a from "./axios";
import {CreateUserSchema, UpdateUserSchema} from "@cat-hunter/types";
import {z} from "zod";

export const UserQueryKeys = {
  ME: ["ME"],
  USER_BY_ID: (user_id: string) => ["USER_BY_ID", user_id],
  CREATE_USER: ["CREATE_USER"],
  UPDATE_USER: ["UPDATE_USER"],
  DELETE_USER: ["DELETE_USER"]
};

export function getMe() {
  return $a.get("/api/user");
}

export function getUserById(user_id: string) {
  return $a.get(`/api/user/${user_id}`);
}

export function createUser(data: z.infer<typeof CreateUserSchema>) {
  return $a.post("/api/user", data);
}

export function updateUser(data: z.infer<typeof UpdateUserSchema>) {
  return $a.patch("/api/user", data);
}


export function deleteUser() {
  return $a.delete("/api/user");
}
