"use server";

import axios from "@/lib/axios";

export async function getCategories() {
  try {
    return await axios
        .get("/api/categories")
        .then((response) => response.data);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(`Error getting categories: ${errorMessage}`);
  }
}
