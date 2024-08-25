"use server";
import axios from "@/lib/axios";

interface ProductParams {
  slug: string;
  page?: number;
}

export async function getAttrs({ slug }: ProductParams) {
  try {
    const response = await axios.get(`/api/products/attrs/`, {
      params: { slug },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(`Error getting attributes: ${errorMessage}`);
  }
}
