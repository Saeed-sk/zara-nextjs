'use server'
import axios from "@/lib/axios";

interface ProductParams {
  id: number;
}

export async function getProduct({ id }: ProductParams) {
  try {
    const response = await axios.get(`/api/product/`, {
      params: { id: id },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(`Error getting product: ${errorMessage}`);
  }
}
