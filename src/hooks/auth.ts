import useSWR from 'swr';
import axios from '@/lib/axios';
import csrf from '@/lib/csrf';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/navigation';
import {
    LoginProps,
    RegisterProps,
    AuthProps,
    BasketType,
    ResponseTypeAuth, ColorType, SizeType, ImageType
} from '@/types';
import {useCallback, useEffect} from 'react';
import {setUser, setUserError, setUserStatus} from '@/store/features/userSlice';
import {addDefaultFavorites} from '@/store/features/favoritesSlice';
import {addFullBasket} from '@/store/features/basketSlice';

interface SwrResponse<T> {
    data: T | undefined;
    error: any;
    mutate: () => void;
}

// Define the fetcher function
const fetchUser = async (): Promise<ResponseTypeAuth> => {
    try {
        const res = await axios.get<ResponseTypeAuth>('/api/user');
        return res.data;
    } catch (error) {
        // Manually check if the error is an Axios error
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { status?: number } };
            if (axiosError.response?.status === 409) {
                throw new Error('verify-email');
            }
        }
        // Throw the error if it's not an Axios error or doesn't match the conditions
        throw error;
    }
};

export const useAuth = ({
                            middleware,
                            redirectIfAuthenticated,
                        }: AuthProps = {}) => {
    const router = useRouter();
    const dispatch = useDispatch();

    // Use useSWR with the fetcher function
    const {
        data: userData,
        error,
        mutate,
    }: SwrResponse<ResponseTypeAuth> = useSWR<ResponseTypeAuth>('/api/user', fetchUser);

    useEffect(() => {

        if (userData) {
            dispatch(setUser(userData.user));
            dispatch(addDefaultFavorites(userData.favorites));
            const baskets: BasketType[] = userData.baskets[0].products.map((basket) => {

                const color = basket.pivot.color_id && basket.colors.length
                    ? basket.colors.find((color) => color.id === basket.pivot.color_id) : undefined

                const size = basket.sizes.find((size) => size.id === basket.pivot.size_id) ?? undefined

                return {
                    id: basket.id,
                    title: basket.title ?? 'Unknown',
                    slug: basket.slug,
                    discount: basket.discount ?? 0,
                    color: color,
                    size: size,
                    images: basket.images ?? [],
                    price: basket.price || '0',
                    quantity: basket.pivot.quantity,
                };
            });
            dispatch(addFullBasket(baskets));
            dispatch(setUserStatus('idle'));
        } else if (error) {
            if (error.message === 'verify-email') {
                router.push('/verify-email');
            } else {
                dispatch(setUserError('Failed to fetch user data'));
                dispatch(setUserStatus('failed'));
            }
        }
    }, [userData, error, dispatch, router]);

    const register = async ({setErrors, ...props}: RegisterProps) => {
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

    const login = async ({setErrors, setStatus, ...props}: LoginProps) => {
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
                dispatch(setUserError('Login failed'));
            }
            dispatch(setUserStatus('failed'));
        }
    };

    const logout = useCallback(async () => {
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
    }, [error, dispatch]);

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && userData) {
            router.push(redirectIfAuthenticated);
        } else if (middleware === 'auth' && error) {
            logout();
        }
    }, [userData, error, middleware, redirectIfAuthenticated, router, logout]);

    return {
        userData,
        register,
        login,
        logout,
    };
};
