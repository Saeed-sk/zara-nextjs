"use server";

import axios from "@/lib/axios";

export async function getCategories() {
  try {
    const res = await axios
      .get("/api/categories")
      .then((response) => response.data);
    return res;
  } catch (error:any) {
    throw new Error(`Error fetching products: ${error.message || error}`);
    // console.log("Errpr fetching data : ", error.message);
    // return null;
  }
}
