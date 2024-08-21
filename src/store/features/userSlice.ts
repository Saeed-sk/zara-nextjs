import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from '@/types';
import axios from '@/lib/axios';

// Async thunk برای فچ کردن اطلاعات کاربر
export const fetchUser = createAsyncThunk<UserType>('user/fetchUser', async () => {
    const response = await axios.get<UserType>('/api/user');
    return response.data;
});

// تعریف حالت اولیه state برای user
interface UserState {
    user: UserType | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

// Slice برای user
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch user';
            });
    },
});

export default userSlice.reducer;
