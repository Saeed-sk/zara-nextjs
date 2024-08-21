import {ProductType} from "@/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Props {
    baskets: ProductType[];
    basketsCount: number;
    basketShow: boolean;
}
const initialState:Props = {
    baskets: [],
    basketsCount: 0,
    basketShow: false,
};

export const basketSlice = createSlice({
    name: 'baskets',
    initialState,
    reducers: {
        addBasket: (state, action: PayloadAction<ProductType>): void => {
            const product = action.payload;
            if (!state.baskets.some(basket => basket.id === product.id)) {
                state.baskets.push(product);
                state.basketsCount = state.baskets.length;
                localStorage.setItem('baskets', JSON.stringify(state.baskets));
            } else {
                state.baskets = state.baskets.filter(basket => basket.id !== action.payload.id);
                state.basketsCount = state.baskets.length;
                localStorage.setItem('baskets', JSON.stringify(state.baskets));
            }
        },
        addFullBasket: (state, action: PayloadAction<ProductType[]>): void => {
            const products = action.payload;

            products.forEach(product => {
                if (!state.baskets.some(basket => basket.id === product.id)) {
                    state.baskets.push(product);
                }
            });
            state.basketsCount = state.baskets.length;
            localStorage.setItem('baskets', JSON.stringify(state.baskets));
        },
        setBasketShow: (state) => {
            state.basketShow = !state.basketShow
        },
    }
});

export const {setBasketShow, addBasket} = basketSlice.actions;
export default basketSlice.reducer;
