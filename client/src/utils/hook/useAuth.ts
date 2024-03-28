import { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchAuthUserThunk } from "@/redux/users/userSlice";
import { UserDetails } from "../types";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const controller = new AbortController();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await dispatch(fetchAuthUserThunk()).unwrap();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    }

    return () => {
      controller.abort();
    };
  }, [user]);

  return { user, isLoading };
}
