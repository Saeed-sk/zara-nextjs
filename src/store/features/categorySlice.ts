import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {getCategories} from "@/api/getCategories";
import {CategoryProps} from "@/types";

interface Props {
    categories: CategoryProps[] | undefined;
    isLoading: boolean;
    error: any;
    selectedCategory: number;
    path: string;
}

const initialState: Props = {
    categories: undefined,
    isLoading: true,
    error: null,
    selectedCategory: 0,
    path: 'home',
};

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
    const response: any = await getCategories();
    return response;
});
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<number>) => {
            state.selectedCategory = action.payload;
        },
        changePath: (state, action: PayloadAction<string>) => {
            state.path = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<CategoryProps[]>) => {
                state.isLoading = false;
                state.categories = action.payload;
                state.selectedCategory = 0;
            })
            .addCase(fetchCategory.rejected, (state: Props, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            });
    },
});
export const {select, changePath} = categorySlice.actions;
export default categorySlice.reducer;
