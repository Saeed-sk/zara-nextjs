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
    throw new Error(`Error fetching products: ${error.message || error}`);
    // console.log("Errpr fetching data : ", error.message);
    // return null;
  }
}
