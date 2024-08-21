import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "@/store/features/categorySlice";
import { filterSlice } from "@/store/features/filterSlice";
import { gridSlice } from "@/store/features/gridSlice";
import { favoritesSlice } from "@/store/features/favoritesSlice";
import { basketSlice } from "@/store/features/basketSlice";
import { userSlice } from "./features/userSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    filter: filterSlice.reducer,
    gridStore: gridSlice.reducer,
    favorite: favoritesSlice.reducer,
    basket: basketSlice.reducer,
    userInfo: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
