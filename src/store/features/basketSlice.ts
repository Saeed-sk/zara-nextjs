import { BasketType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    deleteFullBasketApi,
    deleteProductFromBasketApi,
    postFullBasketApi,
    postProductToBasketApi,
} from "@/api/basketsApi";

interface Props {
    baskets: BasketType[];
    basketsCount: number;
    basketShow: boolean;
    totalPrice: number;
    isLoading: boolean;
    totalDiscount: number;
}

const initialState: Props = {
    baskets: [],
    basketsCount: 0,
    basketShow: false,
    totalPrice: 0,
    isLoading: false,
    totalDiscount: 0
};

export const postFullBasket = createAsyncThunk(
    'baskets/postFullBasket',
    async ({ products, total_price }: { products: BasketType[]; total_price: number }, { rejectWithValue }) => {
        try {
            const response = await postFullBasketApi(products, total_price);
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteFullBasket = createAsyncThunk(
    'baskets/deleteFullBasket',
    async (_, { rejectWithValue }) => {
        try {
            await deleteFullBasketApi();
            return;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const postProductToBasket = createAsyncThunk(
    'baskets/postProductToBasket',
    async ({ product, total_price }: { product: BasketType; total_price: number }, { rejectWithValue }) => {
        try {
            const response = await postProductToBasketApi(product, total_price);
            return response.data; // Adjust if necessary based on the API response
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteProductFromBasket = createAsyncThunk<void, { product: BasketType; total_price: number }>(
    'baskets/deleteProductFromBasket',
    async ({ product, total_price }, { rejectWithValue }) => {
        try {
            await deleteProductFromBasketApi(product, total_price);
            return;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const basketSlice = createSlice({
    name: 'baskets',
    initialState,
    reducers: {
        addBasket: (state, action: PayloadAction<BasketType>) => {
            const product = action.payload;
            const inBasket = state.baskets.some(
                (basket) =>
                    basket.id === product.id &&
                    basket.color?.id === product.color?.id &&
                    basket.size?.id === product.size?.id
            );
            if (inBasket) {
                state.baskets = state.baskets.filter(
                    (basket) =>
                        basket.id !== product.id ||
                        basket.color?.id !== product.color?.id ||
                        basket.size?.id !== product.size?.id
                );
                state.totalDiscount -= Math.floor((Number(product.price) * (product.discount / 100)));
                state.totalPrice -= Number(product.price);
            } else {
                state.baskets.push(product);
                state.totalDiscount += Math.floor((Number(product.price) * (product.discount / 100)));
                state.totalPrice += Number(product.price);
            }
            state.basketsCount = state.baskets.length;
        },
        addFullBasket: (state, action: PayloadAction<BasketType[]>) => {
            const products = action.payload;
            state.baskets = products;
            state.basketsCount = products.length;
            state.totalPrice = products.reduce((total, basket) => total + Number(basket.price) * basket.quantity, 0);
            state.totalDiscount = products.reduce((total, basket) => total + Math.floor((Number(basket.price) * (basket.discount / 100))) * basket.quantity, 0);
        },
        setBasketShow: (state) => {
            state.basketShow = !state.basketShow;
        },
        setTotalPrice: (state) => {
            state.totalPrice = state.baskets.reduce((total, basket) => total + Number(basket.price) * basket.quantity, 0);
            state.totalDiscount = state.baskets.reduce((total, basket) => total + Math.floor((Number(basket.price) * (basket.discount / 100))) * basket.quantity, 0);
        },
        changeQuantity: (state, action: PayloadAction<{ product: BasketType; quantity: number }>) => {
            const { product, quantity } = action.payload;
            const index = state.baskets.findIndex(
                (basket) =>
                    basket.id === product.id &&
                    basket.color?.id === product.color?.id &&
                    basket.size?.id === product.size?.id
            );
            if (index !== -1) {
                state.baskets[index].quantity = quantity;
                state.basketsCount = state.baskets.length;
                state.totalPrice = state.baskets.reduce((total, basket) => total + Number(basket.price) * basket.quantity, 0);
                state.totalDiscount = state.baskets.reduce((total, basket) => total + Math.floor((Number(basket.price) * (basket.discount / 100))) * basket.quantity, 0);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postProductToBasket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postProductToBasket.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log('Added to basket', action.payload);
                // Optionally update state.baskets if needed
            })
            .addCase(postProductToBasket.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Failed to post product to basket:', action.payload);
            })
            .addCase(deleteProductFromBasket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductFromBasket.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log('Removed from basket', action.payload);
                // Optionally update state.baskets if needed
            })
            .addCase(deleteProductFromBasket.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Failed to delete product from basket:', action.payload);
            });
    },
});

export const { setBasketShow, changeQuantity, setTotalPrice, addFullBasket, addBasket } = basketSlice.actions;
export default basketSlice.reducer;
