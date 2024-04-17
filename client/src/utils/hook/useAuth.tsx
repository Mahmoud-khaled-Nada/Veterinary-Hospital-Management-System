import { useEffect, useState } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { fetchAuthUserThunk } from "@/store/userSlice";
import { User } from "../types";
export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const controller = new AbortController();

  const fetchUser = async () => {
    try {
      const data = await dispatch(fetchAuthUserThunk()).unwrap();
      console.log(data)
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }

    return () => {
      controller.abort();
    };
  }, [user]);

  return { user, isLoading };
}
