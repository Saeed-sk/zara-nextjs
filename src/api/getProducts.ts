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
    throw new Error(`Error fetching products: ${error.message || error}`);
    // console.log("Errpr fetching data : ", error.message);
    // return null;
  }
}
