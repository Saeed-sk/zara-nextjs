//  has client side effects for token do nat add use server on top
import axios from "@/lib/axios";
import {BasketType, ProductType} from "@/types";

export async function getFullBasketApi() {
    try {
        const response = await axios.get('/api/basket');
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error posting basket: ${errorMessage}`);
    }
}

export async function postFullBasketApi(products: BasketType[], total_price: number) {
    try {
        const response = await axios.post('/basket', {
            products: products,
            total_price: String(total_price)
        });

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error posting basket: ${errorMessage}`);
    }
}

export async function deleteFullBasketApi() {
    try {
        const response = await axios.post('/api/basket/delete');
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error delete baskets: ${errorMessage}`);
    }
}

export async function postProductToBasketApi(product: BasketType, total_price: number) {
    try {
        const response = await axios.post('/api/basket/product/add', {
            product: product,
            total_price: String(total_price)
        });

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error posting product to basket: ${errorMessage}`);
    }
}

export async function deleteProductFromBasketApi(product: BasketType, total_price:number) {
    try {
        const response = await axios.post('/api/basket/product/remove', {
            product: product,
            total_price: String(total_price)
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error delete product from basket: ${errorMessage}`);
    }
}

