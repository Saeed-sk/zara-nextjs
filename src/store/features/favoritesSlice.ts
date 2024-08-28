import { ProductType } from "@/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteFavorites, postFavorites } from "@/api/favoritesApi";

// Define the initial state interface
interface FavoritesState {
    favorites: ProductType[];
    favoritesCount: number;
    isLoading: boolean;
}

const initialState: FavoritesState = {
    favorites: [],
    favoritesCount: 0,
    isLoading: false,
};

// Thunks
export const postFavoriteAsync = createAsyncThunk<ProductType, ProductType>(
    'favorites/postFavorite',
    async (product, { rejectWithValue }) => {
        try {
            await postFavorites(Number(product.id));
            return product;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteFavoriteAsync = createAsyncThunk<ProductType, ProductType>(
    'favorites/deleteFavorite',
    async (product, { rejectWithValue }) => {
        try {
            await deleteFavorites(Number(product.id));
            return product;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

// Slice
export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<ProductType>) => {
            // Implementation of addFavorite if needed
        },
        addDefaultFavorites: (state, action: PayloadAction<ProductType[]>) => {
            state.favorites = action.payload;
            state.favoritesCount = action.payload.length;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postFavoriteAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postFavoriteAsync.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.favorites.push(action.payload);
                state.isLoading = false;
                state.favoritesCount = state.favorites.length;
            })
            .addCase(postFavoriteAsync.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Failed to post favorite:', action.payload);
            })
            .addCase(deleteFavoriteAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFavoriteAsync.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload.id);
                state.favoritesCount = state.favorites.length;
                state.isLoading = false;
            })
            .addCase(deleteFavoriteAsync.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Failed to delete favorite:', action.payload);
            });
    },
});

// Export actions and reducer
export const { addFavorite, addDefaultFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
