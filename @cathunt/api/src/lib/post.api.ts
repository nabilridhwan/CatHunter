import $a from "./axios";
import {CreateUserSchema, UpdateUserSchema} from "@cat-hunter/types";
import {z} from "zod";

export const PostQueryKeys = {
  GET_ALL_POSTS: ["GET_ALL_POSTS"],
};

export function getPosts() {
  return $a.get("/api/post");
}

