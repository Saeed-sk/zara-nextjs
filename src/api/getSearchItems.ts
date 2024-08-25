"use server";
import axios from "@/lib/axios";

interface SearchParams {
  slug: string;
  query: string;
}

export async function getSearchItems({ slug, query }: SearchParams) {
  try {
    const response = await axios.get(`/api/search/`, {
      params: { slug, query },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(`Error getting search products: ${errorMessage}`);
  }
}
