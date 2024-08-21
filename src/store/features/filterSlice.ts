import {createSlice} from "@reduxjs/toolkit";
import {AttributeType, ColorType, ProductType, SizeType} from "@/types";

interface Props {
    filters: {
        allColors: ColorType[];
        allAttributes: AttributeType[];
        allSizes: SizeType[];
        minPrice: number;
        maxPrice: number;
    },
    selectedFilter: {
        colors: number[];
        sizes: number[];
        attributes: number[];
        minPrice?: number;
        maxPrice?: number;
    },
    products: ProductType[];
    filteredProducts: ProductType[];
}

const initialState: Props = {
    filters: {
        allColors: [],
        allAttributes: [],
        allSizes: [],
        minPrice: 0,
        maxPrice: 0
    },
    selectedFilter: {
        colors: [],
        sizes: [],
        attributes: [],
    },
    products: [],
    filteredProducts: []
};

const filterProducts = (state: Props) => {
    const {colors, sizes, attributes, minPrice, maxPrice} = state.selectedFilter;

    state.filteredProducts = state.products.filter(product => {
        const colorMatch = colors.length ? colors.some(colorId => product.colors.some(color => color.id === colorId)) : true;
        const sizeMatch = sizes.length ? sizes.some(sizeId => product.sizes.some(size => size.id === sizeId)) : true;
        const attributeMatch = attributes.length ? attributes.some(attrId => product.attributes.some(attr => attr.id === attrId)) : true;
        const priceMatch = (minPrice !== undefined ? Number(product.price) >= minPrice : true) &&
            (maxPrice !== undefined ? Number(product.price) <= maxPrice : true);

        return colorMatch && sizeMatch && attributeMatch && priceMatch;
    });
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDefaultItems(state,action) {
            state.filters.allColors = action.payload.colors;
            state.filters.allAttributes = action.payload.attributes;
            state.filters.allSizes = action.payload.sizes;
            state.filters.minPrice = action.payload.minPrice;
            state.filters.maxPrice = action.payload.maxPrice;
        },
        setColorsFilter(state, action) {
            state.selectedFilter.colors = action.payload;
            filterProducts(state);
        },
        setSizesFilter(state, action) {
            state.selectedFilter.sizes = action.payload;
            filterProducts(state);
        },
        setAttributesFilter(state, action) {
            state.selectedFilter.attributes = action.payload;
            filterProducts(state);
        },
        setPriceRangeFilter(state, action) {
            state.selectedFilter.minPrice = action.payload.minPrice;
            state.selectedFilter.maxPrice = action.payload.maxPrice;
            filterProducts(state);
        },
        setProducts(state, action) {
            state.products = action.payload;
            state.filteredProducts = action.payload;
            filterProducts(state);
        },
        setInitialFilters(state, action) {
            state.filters = action.payload;
        }
    }
});

export const {
    setColorsFilter,
    setSizesFilter,
    setAttributesFilter,
    setPriceRangeFilter,
    setProducts,
    setInitialFilters,
    setDefaultItems
} = filterSlice.actions;

export default filterSlice.reducer;
