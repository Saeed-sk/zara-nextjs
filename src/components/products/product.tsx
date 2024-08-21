import React, {useState} from 'react';
import {ProductType} from "@/types";
import Link from "next/link";
import Icons from '../icon';
import {useMarked} from "@/hooks/favorites";
import {useDispatch} from "react-redux";
import {addFavorite} from "@/store/features/favoritesSlice";
import {useImageSrc} from "@/hooks/src";
import {AnimatePresence, motion} from "framer-motion";
import {addBasket} from "@/store/features/basketSlice";
import {useInBasket} from "@/hooks/bascket";
import Image from "next/image";
// TODO add size and color to basket and when add them to basket
export const ProductShowInGrid = ({product, slug, pageGrids, single}: {
    product: ProductType,
    slug: string,
    pageGrids: number,
    single: boolean
}) => {
    let src;
    if (product.images.length > 0) {
        src = useImageSrc(product.images[0].src)
    }
    const isMarked = useMarked(product);
    const inBasket = useInBasket(product)
    const dispatch = useDispatch()
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
                               src={src} alt={product.title}
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
                            <button onClick={() => {
                                dispatch(addFavorite(product))
                            }} className={'text-sm ml-1'}>
                                {isMarked ? <Icons name={'bookmarked'}/> : <Icons name={'bookmark'}/>}
                            </button>
                        </div>)}
                </div>
            </div>
            {!single && product.children.map((child, index) =>
                <ProductShowInGrid key={index} product={child} slug={slug} pageGrids={pageGrids} single={true}/>
            )}
            {/* show product in grid end*/}
        </>
    )
}

