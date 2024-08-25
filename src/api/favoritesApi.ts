//  has client side effects for token dont add use server
import axios from "@/lib/axios";

export async function deleteFavorites(id: number) {
    try {
        const response = await axios.post('/api/favorites/delete', {
            product_id: id
        });

        return response.data;

    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error posting favorite: ${errorMessage}`);
    }
}

export async function postFavorites(id: number) {
    try {
        const response = await axios.post('/api/favorites', {
            product_id: id
        });

        return response.data;

    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error posting favorite: ${errorMessage}`);
    }
}
