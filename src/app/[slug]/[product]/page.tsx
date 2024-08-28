import { getProduct } from "@/api/getProduct";
import { ProductType } from "@/types";
import {AddCartSingle} from "@/components/products/addCart/single";

export default async function Page({ params }: any) {
    const id = params.product;
    const product: ProductType = await getProduct({ id })
   return <AddCartSingle product={product} />
}
