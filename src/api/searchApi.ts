import axios from "@/lib/axios";

export async function getSearchDefaults() {
    try {
        const response = await axios.get('/api/search/items');
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error getting search products: ${errorMessage}`);
    }
}

export async function getSearchWithQuery({query}: { query: string }) {
    try {
        const response = await axios.get('/api/search/query', {params: {query}});
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        throw new Error(`Error getting search products: ${errorMessage}`);
    }
}