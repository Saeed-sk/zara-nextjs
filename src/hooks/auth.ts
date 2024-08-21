import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {LoginProps, RegisterProps, AuthProps, UserType} from "@/types";
import csrf from "@/lib/csrf";

interface SwrResponse<T> {
  data: T | undefined;
  error: any;
  mutate: () => void;
}

export const useAuth = ({
                          middleware,
                          redirectIfAuthenticated,
                        }: AuthProps = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  }: SwrResponse<UserType> = useSWR("/api/user", () =>
      axios
          .get<UserType>("/api/user")
          .then((res) => res.data)
          .catch((error) => {
            if (error.response?.status === 409) {
              router.push("/verify-email");
            } else {
              throw error;
            }
          })
  );

  const register = async ({ setErrors, ...props }: RegisterProps) => {
    try {
      await csrf();
      setErrors([]);
      await axios.post("/api/register", props);
      mutate();
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
    try {
      await csrf();
      setErrors([]);
      setStatus(null);
      await axios.post("/api/login", props);
      mutate();
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    try {
      if (!error) {
        await axios.post("/api/logout");
        mutate();
      }
      window.location.pathname = '/login'
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    } else if (middleware === "auth" && error) {
      logout();
    }
  }, [user, error, middleware, redirectIfAuthenticated, router, logout]);

  return {
    user,
    register,
    login,
    logout,
  };
};
