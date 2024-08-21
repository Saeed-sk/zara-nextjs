import { Products } from "@/components/products/products";
import { getAttrs } from "@/api/getAttrs";

export default async function Page({ params }: any) {
    const slug = params.slug;
    const attrs = await getAttrs({ slug });
    return (
        <Products attrs={attrs} slug={slug} />
    );
}
