import $a from "./axios";
import {CreatePostSchema, CreateUserSchema, PostCommentsResponseSchema, UpdateUserSchema} from "@cat-hunter/types";
import {z} from "zod";

export const PostQueryKeys = {
  GET_ALL_POSTS: ["GET_ALL_POSTS"],
  GET_POST_COMMENTS: (post_id: string) => ["GET_POST_COMMENTS", post_id],
};

export const PostMutationKeys = {
  CREATE_POST: ["CREATE_POST"],
  DELETE_POST: ["DELETE_POST"],
}

export function getPosts() {
  return $a.get("/api/post");
}

export function createPost(data: z.infer<typeof CreatePostSchema>) {
  return $a.post("/api/post", data);
}


export function deletePost(post_id: string) {
  return $a.delete(`/api/post/${post_id}`);
}

export function getPostComments(post_id: string) {
  return $a.get<z.infer<typeof PostCommentsResponseSchema>>(`/api/post/comment/${post_id}`);
}


