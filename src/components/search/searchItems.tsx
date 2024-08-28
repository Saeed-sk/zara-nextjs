import {ProductType} from "@/types";
import Link from "next/link";
import Icons from "@/components/icon";
import Image from "next/image";
import AddFavorites from "@/components/products/addFavorites";
import React from "react";
import {getImageSrc} from "@/hooks/src";

export const SearchProducts:React.FC<{ product: ProductType ,index:number}>= ({product,index}) => {
    console.log(index)
    let src = '';
    if (product?.images?.length) {
        src = getImageSrc(product.images[0].src);
    }
    return (
        <div
            className={`aspect-product text-sm ${index === 0 && 'border-t border-l border-black w-full h-full'}`}>
            <Link href={`/products/${product.id}`}
                  className={'relative block'}>
                <div className={'w-full aspect-product flex justify-center relative'}>
                    <Image fill
                           className={'z-0 object-cover'}
                           src={src} alt={String(product?.title)}
                           sizes={'(width:100%)'}
                           priority
                    />
                </div>
            </Link>

            <div className='w-full flex justify-between'>
                <div className={'text-black'}>
                    <p>{product.title}</p>
                    <p>{product.price} تومان</p>
                </div>
                <AddFavorites product={product}/>
            </div>
        </div>
    )
}
