import {ProductType} from "@/types";
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {deleteFavorites, postFavorites} from "@/api/favoritesApi";
import {RootState} from "@/store/store";

const initialState = {
    favorites: [] as ProductType[],
    favoritesCount: 0,
    isLoading: false,
};

export const postFavoriteAsync = createAsyncThunk(
    'favorites/postFavorite',
    async (product: ProductType, {rejectWithValue}) => {
        try {
            await postFavorites(Number(product.id));
            return product;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteFavoriteAsync = createAsyncThunk(
    'favorites/deleteFavorite',
    async (product: ProductType, {rejectWithValue}) => {
        try {
            await deleteFavorites(Number(product.id));
            return product;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<ProductType>) => {
            //
        },
        addDefaultFavorites: (state, action: PayloadAction<ProductType[] | []>) => {
            state.favorites = action.payload;
            state.favoritesCount = action.payload.length;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postFavoriteAsync.pending, (state: RootState, action) => {
                state.isLoading = true;
            })
            .addCase(postFavoriteAsync.fulfilled, (state: RootState, action) => {
                state.favorites.push(action.payload);
                state.isLoading = false;
                state.favoritesCount = state.favorites.length;
            })
            .addCase(postFavoriteAsync.rejected, (state: RootState, action) => {
                state.isLoading = false;
                console.error('Failed to post favorite:', action.payload);
            })
            .addCase(deleteFavoriteAsync.pending, (state: RootState, action) => {
                state.isLoading = true;
            })
            .addCase(deleteFavoriteAsync.fulfilled, (state: RootState, action: PayloadAction<ProductType>) => {
                state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload.id);
                state.favoritesCount = state.favorites.length;
                state.isLoading = false;
            })
            .addCase(deleteFavoriteAsync.rejected, (state: RootState, action) => {
                console.error('Failed to delete favorite:', action.payload);
                state.isLoading = false;
            });
    },
});

export const {addFavorite, addDefaultFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
