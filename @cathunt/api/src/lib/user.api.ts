import axiosInstanceWithAuth from "./getAxiosInstance";
import {UpdateUserSchema} from "@cat-hunter/types";
import {z} from "zod";

export function getMe() {
  return axiosInstanceWithAuth.get("/api/user");
}

export function getUserById(id: string) {
  return axiosInstanceWithAuth.get(`/api/user/${id}`);
}

export function updateUser(data: z.infer<typeof UpdateUserSchema>) {
  return axiosInstanceWithAuth.patch("/api/user", data);
}


export function deleteUser() {
  return axiosInstanceWithAuth.delete("/api/user");
}
