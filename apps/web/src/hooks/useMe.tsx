import {useQuery} from "@tanstack/react-query";
import {getMe, UserQueryKeys} from "@cat-hunter/api";
import {useAuth} from "./useAuth";
import {z} from "zod";
import {GetProfileResponseSchema} from "@cat-hunter/types";
import {AxiosError} from "axios";

export function useMe() {
  const {accessToken} = useAuth();

  const query = useQuery({
    queryKey: UserQueryKeys.ME,
    queryFn: () => getMe(),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data as z.infer<typeof GetProfileResponseSchema>,
  });

  if (query.error && query.error instanceof AxiosError) {
    if (query.error.response?.status === 403) {
      //   Redirect to login screen
      window.location.href = '/login'
    }
  }

  return query;
}
