import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '@/types';

interface UserState {
    user: UserType | null;
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
    token:null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType | null>) => {
            state.user = action.payload;
        },
        setToken:(state,action :PayloadAction<string | null>)=>{
            state.token = action.payload
        },
        setUserStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
            state.status = action.payload;
        },
        setUserError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {setUser, setUserStatus, setUserError} = userSlice.actions;

export default userSlice.reducer;