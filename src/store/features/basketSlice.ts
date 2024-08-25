import {BasketType} from "@/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    deleteFullBasketApi,
    deleteProductFromBasketApi,
    postFullBasketApi,
    postProductToBasketApi,
} from "@/api/basketsApi";
import {RootState} from "@/store/store";

interface Props {
    baskets: BasketType[] | [];
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
    totalDiscount:0
};

export const postFullBasket = createAsyncThunk(
    'baskets/postFullBasket',
    async (products: BasketType[], {rejectWithValue}) => {
        try {
            const response = await postFullBasketApi(products);
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteFullBasket = createAsyncThunk(
    'baskets/deleteFullBasket',
    async (_, {rejectWithValue}) => {
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
    async ({product, total_price}: { product: BasketType, total_price: number }, {rejectWithValue}) => {
        try {
            const response = await postProductToBasketApi(product, total_price);
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteProductFromBasket = createAsyncThunk(
    'baskets/deleteProductFromBasket',
    async ({product, total_price}: { product: BasketType, total_price: number }, {rejectWithValue}) => {
        try {
            const response = await deleteProductFromBasketApi(product, total_price);
            return response;
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
        addBasket: (state, action: PayloadAction<BasketType>): void => {
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
                        basket.color.id !== product.color?.id ||
                        basket.size.id !== product.size?.id
                );
                state.basketsCount = state.baskets.length;
            } else {
                state.baskets.push(product);
                state.basketsCount = state.baskets.length;
            }
        },
        addFullBasket: (state, action: PayloadAction<BasketType[]>): void => {
            const products = action.payload;
            state.baskets = products;
            state.basketsCount = products.length;
        },
        setBasketShow: (state) => {
            state.basketShow = !state.basketShow;
        },
        setTotalPrice: (state) => {
            let total = 0;
            let discount = 0;
            state.baskets.forEach((basket) => {
                total += Number(basket.price) * basket.quantity;
                discount += Math.floor((Number(basket.price) * (basket.discount / 100)))* basket.quantity;
            });
            state.totalDiscount = discount;
            state.totalPrice = total;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postProductToBasket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postProductToBasket.fulfilled, (state, action) => {
                // state.baskets.push(action.payload);
                state.isLoading = false;
                // state.basketsCount = state.baskets.length; // Corrected field
                console.log('add to basket',action.payload)
            })
            .addCase(postProductToBasket.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Failed to post product to basket:', action.payload);
            })
            .addCase(deleteProductFromBasket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductFromBasket.fulfilled, (state: RootState, action) => {
                state.baskets = state.baskets.filter(basket => basket.id !== action.payload.id || basket.color?.id !== action.payload.color?.id || basket.size?.id !== action.payload.size?.id);
                state.basketsCount = state.baskets.length;
                console.log('removed to basket',action.payload)
            })
            .addCase(deleteProductFromBasket.rejected, (state, action) => {
                console.error('Failed to delete products from basket:', action.error);
                state.isLoading = false;
            });
    },
});

export const {setBasketShow,setTotalPrice,addFullBasket, addBasket} = basketSlice.actions;
export default basketSlice.reducer;
