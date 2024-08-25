"use server";
import axios from "@/lib/axios";

interface ProductParams {
  slug: string;
  page?: number;
}

export async function getProducts({ slug, page }: ProductParams) {
  try {
    const response = await axios.get(`/api/products/`, {
      params: { slug, page },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(`Error getting products: ${errorMessage}`);
  }
}
