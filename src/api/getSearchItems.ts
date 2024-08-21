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
    throw new Error(`Error fetching products: ${error.message || error}`);
    // console.log("Errpr fetching data : ", error.message);
    // return null;
  }
}
