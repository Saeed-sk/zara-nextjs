import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GridSliceType {
    grid: number
}

const initialState: GridSliceType = {
    grid: 4
}

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setGrid: (state, action: PayloadAction<number>) => {
            state.grid = action.payload
        }
    }
})

export const {setGrid} = gridSlice.actions

export default gridSlice.reducer