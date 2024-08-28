import React, {useState} from 'react';
import {ProductType} from "@/types";
import Link from "next/link";
import Icons from '../icon';
import {useDispatch} from "react-redux";
import {getImageSrc} from "@/hooks/src";
import {useInBasket} from "@/hooks/bascket";
import Image from "next/image";
import AddFavorites from "@/components/products/addFavorites";
import {AppDispatch} from "@/store/store";
export const ProductShowInGrid = ({product, slug, pageGrids, single}: {
    product: ProductType,
    slug: string,
    pageGrids: number,
    single: boolean
}) => {
    // TODO CHANGE SRC
    let src = '';
    if (product?.images?.length) {
        src = getImageSrc(product.images[0].src);
    }
    const inBasket = useInBasket(product)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            {/* show product in grid start*/}
            <div
                className={`${single ? 'col-span-1' : pageGrids === 4 && 'col-span-full w-full flex items-center justify-center'} group`}>
                <div
                    className={`aspect-product text-sm ${(Boolean(pageGrids === 6) || Boolean(pageGrids === 12)) && 'border-[0.01px] border-black'}`}>
                    <div className={'w-full aspect-product flex justify-center relative'}>
                        <Link href={`/products/${product.id}`}
                              className={' absolute z-10 transition-all opacity-0 group-hover:opacity-100 p-1 bg-gray-300 rounded-full bottom-3'}>
                            <Icons classes={'text-lg'} name={'plus'}/>
                        </Link>
                        <Image fill
                               className={'z-0 object-cover'}
                               src={src} alt={String(product?.title)}
                               sizes={'(width:100%)'}
                               priority
                        />
                    </div>
                    {Boolean(pageGrids !== 12) && (
                        <div className={`${Boolean(pageGrids === 6) && 'p-3'} w-full flex justify-between`}>
                            <div className={'text-black'}>
                                <p>{product.title}</p>
                                <p>{product.price} تومان</p>
                            </div>
                            <AddFavorites product={product}/>
                        </div>)}
                </div>
            </div>
            {!single && product.children?.map((child, index) =>
                <ProductShowInGrid key={index} product={child} slug={slug} pageGrids={pageGrids} single={true}/>
            )}
            {/* show product in grid end*/}
        </>
    )
}

