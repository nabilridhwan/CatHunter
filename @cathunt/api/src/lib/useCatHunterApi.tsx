import {QueryKey, useQuery} from "@tanstack/react-query";
import axios from "axios";
import axiosInstanceWithAuth from "./getAxiosInstance";

type CatHunterApiMethods = "GET" | "POST" | "PATCH" | "DELETE";

// Return useQuery + axios
function useCatHunterApi<T extends object>(path: string, method: CatHunterApiMethods, data?: T, requiresAuth = false) {
  return {
    path,
    method,
    data,
    requiresAuth
  }
}

// function useCatHunterApiMutation<T extends object>(queryKey: QueryKey, path: string, method: CatHunterApiMethods, data?: T, requiresAuth = false) {
//   useQuery(queryKey, () => {
//     return axiosInstanceWithAuth({
//       url: path,
//       method,
//       data
//     })
//   })
//   return {
//     path,
//     method,
//     data,
//     requiresAuth
//   }
// }
