import { getProduct } from "@/api/getProduct";
import { ProductType } from "@/types";
import { ShowCollectionProduct, ShowSingleProduct } from "@/components/products/show/showProduct";

export default async function Page({ params }: any) {
    const id = params.product;
    const product: ProductType = await getProduct({ id })
    if (product.template === 'single') {
        return <ShowSingleProduct product={product} />
    } else {
        return <ShowCollectionProduct product={product} />
    }
}
