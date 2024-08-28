import React from "react";
import {ProductType} from "@/types";
import {AppDispatch, RootState} from "@/store/store";
import {useDispatch, useSelector} from "react-redux";
import {getImageSrc} from "@/hooks/src";
import Link from "next/link";
import Icons from "@/components/icon";
import {addFavorite, deleteFavoriteAsync} from "@/store/features/favoritesSlice";
import {motion} from "framer-motion";
import Image from "next/image";

export const Favorites: React.FC = () => {
    const products = useSelector((state: RootState) => state.favorite.favorites);
    return (
        <motion.section
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2, ease: 'easeIn'}}
            className={'grid grid-cols-3 md:grid-cols-6 divide-black divide-y divide-x'}>
            {products.length > 0 &&
                products.map((product: ProductType, index: number) => (
                    <Favorite index={index} key={index} product={product}/>))}
            {products.length === 0 && <p className={'text-center w-full mt-10'}>موردی یافت نشد</p>}
        </motion.section>
    );
}

export const Favorite: React.FC<{ product: ProductType, index: number }> = ({product,index}) => {
    const dispatch = useDispatch<AppDispatch>();

    function handleDeleteFavorite(product: ProductType) {
        dispatch(addFavorite(product))
        dispatch(deleteFavoriteAsync(product))
    }

    return (
        <div className={`aspect-product relative group border-b border-black ${index===0 && 'border-l'}`}>
            {product?.images && (
                <div className={'w-full h-full relative'}>
                    <Image sizes={'width(100%)'} fill priority className={'object-fill'}
                           src={getImageSrc(product.images[0].src)} alt=""/>
                </div>
            )}
            <button
                className={'absolute top-1 right-1 p-0.5 bg-gray-300 opacity-0 transition-all group-hover:opacity-90 rounded-full'}
                onClick={() => handleDeleteFavorite(product)}>
                <Icons classes={'text-sm'} name={'close'}/>
            </button>
            <div className={'flex justify-between w-full px-2 py-1'}>
                <p className={'text-sm '}>{product.title}</p>
                <Link className={'hover:text-gray-400'} href={`/product/${product.id}`}>
                    <Icons name={'addBasket'}/>
                </Link>
            </div>
        </div>
    )
}