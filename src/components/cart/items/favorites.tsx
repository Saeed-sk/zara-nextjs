import React from "react";
import {ProductType} from "@/types";
import {RootState} from "@/store/store";
import {useDispatch, useSelector} from "react-redux";
import {useImageSrc} from "@/hooks/src";
import Link from "next/link";
import Icons from "@/components/icon";
import {addFavorite} from "@/store/features/favoritesSlice";
import {motion} from "framer-motion";

export const Favorites: React.FC = () => {
    const products: ProductType[] = useSelector((state: RootState) => state.favorite.favorites);
    const dispatch = useDispatch();
    return (
        <motion.section
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2 ,ease: 'easeIn'}}
            className={'flex flex-wrap p-1 gap-1'}>
            {products.map((product, index) => {
                return (
                    <div className={'w-44 relative border-[0.25px] border-black group'} key={index}>
                        <img className={'aspect-product'} src={useImageSrc(product.images[0].src)} alt=""/>
                        <button
                            className={'absolute top-1 right-1 p-0.5 bg-gray-300 opacity-0 transition-all group-hover:opacity-90 rounded-full'}
                            onClick={() => dispatch(addFavorite(product))}>
                            <Icons classes={'text-sm'} name={'close'}/>
                        </button>
                        <div className={'flex justify-between w-full px-2 py-1'}>
                            <p className={'text-sm '}>{product.title}</p>
                            <Link className={''} href={`/product/${product.id}`}>
                                <Icons name={'addBasket'}/>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </motion.section>
    );
}