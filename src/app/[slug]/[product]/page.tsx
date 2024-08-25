import { getProduct } from "@/api/getProduct";
import { ProductType } from "@/types";
import {AddCartSingle} from "@/components/products/addCart/single";
import {AddCartCollection} from "@/components/products/addCart/collection";

export default async function Page({ params }: any) {
    const id = params.product;
    const product: ProductType = await getProduct({ id })
    if (product.template === 'single') {
        return <AddCartSingle product={product} />
    } else {
        return <AddCartCollection product={product} />
    }
}
