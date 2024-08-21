import { ProductType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = (): ProductType[] => {
    // const savedFavorites = localStorage.getItem('favorites');
    // if (savedFavorites) {
    //     try {
    //         return JSON.parse(savedFavorites) as ProductType[];
    //     } catch (error) {
    //         console.error('Failed to parse favorites from localStorage:', error);
    //         return [];
    //     }
    // }
    return [];
};

const initialFavorites = loadFavoritesFromLocalStorage();
const initialState = {
    favorites: initialFavorites,
    favoritesCount: initialFavorites.length,
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<ProductType>) => {
            const product = action.payload;
            if (!state.favorites.some(favorite => favorite.id === product.id)) {
                state.favorites.push(product);
                state.favoritesCount = state.favorites.length;
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }else {
                state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload.id);
                state.favoritesCount = state.favorites.length;
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }
        },
    }
});

export const { addFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
