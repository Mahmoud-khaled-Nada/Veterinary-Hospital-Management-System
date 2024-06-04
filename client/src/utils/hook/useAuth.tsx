import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileAPI } from "../apis";
import { useEffect } from "react";
import { updateUserInfo } from "@/store/userSlice";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const controller = new AbortController();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["fetchAuthUser"],
    queryFn: async () => {
      const response = await getUserProfileAPI();
      return response.data;
    },
    refetchOnMount: false,
  });

  useEffect(() => {
    if (user) dispatch(updateUserInfo(user));

    return () => {
      controller.abort();
    };
  }, [user]);

  return { user, isLoading };
}
