// hooks/useAuth.ts
import useSWR from 'swr';
import axios from '@/lib/axios';
import csrf from '@/lib/csrf';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {LoginProps, RegisterProps, AuthProps, UserType, ProductType, BasketType} from '@/types';
import {useEffect} from "react";
import {setUser, setUserError, setUserStatus} from "@/store/features/userSlice";
import {addDefaultFavorites} from "@/store/features/favoritesSlice";
import {addFullBasket} from "@/store/features/basketSlice";

interface SwrResponse<T> {
  data: T | undefined;
  error: any;
  mutate: () => void;
}
interface Order {
  id: number;
  user_id: number;
  total_price: number;
  payment_status: 'unpaid' | 'paid' | 'pending';
  created_at: string;
  updated_at: string;
  products: ProductType[];
}

interface ResponseTypeUser{
  user: UserType,
  favorites?: ProductType[],
  baskets?: Order[],
}

export const useAuth = ({
                          middleware,
                          redirectIfAuthenticated,
                        }: AuthProps = {}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: user,
    error,
    mutate,
  }: SwrResponse<ResponseTypeUser> = useSWR('/api/user', () =>
      axios
          .get<ResponseTypeUser>('/api/user')
          .then((res) => {
            return res.data
          })
          .catch((error) => {
            if (error.response?.status === 409) {
              router.push('/verify-email');
            } else {
              throw error;
            }
          })
  );

  useEffect(() => {
    if (user) {
      dispatch(setUser(user.user));
      dispatch(addDefaultFavorites(user?.favorites));
      let baskets: BasketType[] | [] = [];
      if (user?.baskets?.length) {
        user.baskets[0].products.forEach((basket) => {
          const color = basket.colors.find((color) => color.id === basket.pivot.color_id);
          const size = basket.sizes.find((size) => size.id === basket.pivot.size_id);
          baskets.push({
            id: basket.id,
            title:basket.title,
            slug:basket.slug,
            discount:basket.discount,
            color: color,
            size: size,
            images: basket.images,
            price: basket.price,
            quantity: basket.pivot.quantity,
          });
        });
      }
      dispatch(addFullBasket(baskets));
      dispatch(setUserStatus('idle'));
    } else if (error) {
      dispatch(setUserError('Failed to fetch user data'));
      dispatch(setUserStatus('failed'));
    }
  }, [user, error, dispatch]);

  const register = async ({ setErrors, ...props }: RegisterProps) => {
    try {
      await csrf();
      setErrors([]);
      dispatch(setUserStatus('loading'));
      await axios.post('/api/register', props);
      mutate();
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        dispatch(setUserError('Registration failed'));
      }
      dispatch(setUserStatus('failed'));
    }
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
    try {
      await csrf();
      setErrors([]);
      setStatus(null);
      dispatch(setUserStatus('loading'));
      await axios.post('/api/login', props);
      mutate();
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        dispatch(setUserStatus('failed'));
      }
      dispatch(setUserStatus('failed'));
    }
  };

  const logout = async () => {
    try {
      if (!error) {
        await axios.post('/api/logout');
        dispatch(setUser(null));
        dispatch(addDefaultFavorites([]));
        window.location.pathname = '/login';
      }
    } catch (err) {
      dispatch(setUserStatus('failed'));
      console.error('Logout failed', err);
    }
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    } else if (middleware === 'auth' && error) {
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
