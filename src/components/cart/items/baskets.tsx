import React, {useEffect} from 'react';
import {BasketType, ProductType} from "@/types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {motion} from "framer-motion";
import Image from "next/image";
import {useImageSrc} from "@/hooks/src";
import Icons from "@/components/icon";
import Link from "next/link";
import {addBasket, deleteProductFromBasket, setTotalPrice} from "@/store/features/basketSlice";

const baskets: React.FC = () => {
    const products: BasketType[] = useSelector((state: RootState) => state.basket.baskets);
    const totalPrice = useSelector((state: RootState) => state.basket.totalPrice)
    const totalDiscount = useSelector((state: RootState) => state.basket.totalDiscount)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTotalPrice())
    }, [products]);

    return (
        <motion.section
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2, ease: 'easeIn'}}
            className={'flex flex-wrap p-1 gap-1'}>
            <div className={'flex justify-between w-full'}>
                <div>{totalPrice}</div>
                <div className={'text-red-500'}>{totalDiscount}</div>
                <div> قیمت نهایی{totalPrice - totalDiscount}</div>
            </div>
            {products.length > 0 &&
                products.map((product: ProductType, index) => {
                    return (
                        <div className={'w-44 aspect-product relative border-[0.25px] border-black group'} key={index}>
                            <div className={'w-full h-full relative'}>
                                <Image sizes={'width(100%)'} fill priority className={'object-fill'}
                                       src={useImageSrc(product.images[0].src)} alt=""/>
                            </div>
                            <button
                                className={'absolute top-1 right-1 p-0.5 bg-gray-300 opacity-0 transition-all group-hover:opacity-90 rounded-full'}
                                onClick={() => {
                                    dispatch(addBasket(product))
                                    dispatch(deleteProductFromBasket({product :product, total_price:80000}))
                                }}>
                                <Icons classes={'text-sm'} name={'close'}/>
                            </button>
                            <div className={'flex justify-between w-full px-2 py-1'}>
                                <p className={'text-sm '}>{product.title}</p>
                                <p className={'text-sm '}>{product.price}</p>
                                <p className={'text-sm '}>{product.quantity}</p>
                                <Link className={'hover:text-gray-400'} href={`/product/${product.id}`}>
                                    <Icons name={'addBasket'}/>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            {products.length === 0 && <p className={'text-center w-full mt-10'}>موردی یافت نشد</p>}
        </motion.section>
    );
};

export default baskets;
