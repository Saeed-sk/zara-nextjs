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
    throw new Error(`Error fetching products: ${error.message || error}`);
    // console.log("Errpr fetching data : ", error.message);
    // return null;
  }
}
