import React, {Fragment, useEffect} from 'react';
import {BasketType, ProductType} from "@/types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {motion} from "framer-motion";
import Image from "next/image";
import {getImageSrc} from "@/hooks/src";
import Icons from "@/components/icon";
import Link from "next/link";
import {addBasket, changeQuantity, deleteProductFromBasket} from "@/store/features/basketSlice";
import {BtnConfirm} from "@/components/default/buttons";
import {InputNumber} from "@/components/default/InputNumber";

export const Baskets: React.FC = () => {
    const products: BasketType[] = useSelector((state: RootState) => state.basket.baskets);
    const totalPrice = useSelector((state: RootState) => state.basket.totalPrice)
    const totalDiscount = useSelector((state: RootState) => state.basket.totalDiscount)

    return (
        <Fragment>
            <section className={'flex justify-between w-full fixed bottom-0 border-y border-black z-50 bg-gray-50'}>
                <div className={'p-5 flex-col gap-4'}>
                    <p className={'text-sm'}>مبلغ قابل پرداخت:</p>
                    <p className={'text-xl'}>{totalPrice- totalDiscount} تومان</p>
                </div>
                <BtnConfirm className={'px-16 text-xl'}>
                    ادامه خرید
                </BtnConfirm>
            </section>
            <motion.section
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.2, ease: 'easeIn'}}
                className={'flex flex-wrap p-1 mb-24 divide-x'}>
                {products.length > 0 &&
                    products.map((product: BasketType, index) => (
                            <Basket product={product} key={index} totalPrice={totalPrice} totalDiscount={totalDiscount}/>
                        )
                    )}
                {products.length === 0 && <p className={'text-center w-full mt-10'}>موردی یافت نشد</p>}
            </motion.section>
        </Fragment>
    );
};

export const Basket: React.FC<{ product: BasketType, totalPrice: number, totalDiscount: number }> = ({
                                                                                                         product,
                                                                                                         totalPrice,
                                                                                                         totalDiscount
                                                                                                     }) => {
    const dispatch = useDispatch<AppDispatch>();

    function handelDeleteProducts(product: BasketType) {
        dispatch(addBasket(product))
        dispatch(deleteProductFromBasket({product, total_price: Number(totalPrice - totalDiscount)}));
    }
    function onChangeQuantity(quantity: number) {
        dispatch(changeQuantity({product, quantity}))
    }
    return (
        <div className={'w-44 aspect-product relative border border-black group'} >
            <div className={'w-full h-full relative'}>
                {product?.images && product.images.length > 0 && (
                    <Image sizes={'width(100%)'} fill priority className={'object-fill'}
                           src={getImageSrc(product.images[0].src)} alt=""/>
                )}
            </div>

            <div className={'flex flex-col justify-between w-full p-3 gap-3 '}>
                <div className={'flex w-full justify-between items-start'}>
                    <button
                        className={''}
                        onClick={() => handelDeleteProducts(product)}>
                        <Icons classes={'text-xl'} name={'close'}/>
                    </button>
                    <div className={'flex flex-col'}>
                        <p className={'text-sm text-end'}>{product.title}</p>
                        <p className={'text-sm'}>
                            <span>{product.price}</span>
                            <span className={'text-xs pr-1'}> تومان</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-end justify-end w-full text-sm">
                    {product.size && <p>{product.size.size}</p>}
                    <span className={'px-1'}>|</span>
                    {product.color && <p>{product.color.name}</p>}
                </div>
                <div className={'flex justify-end w-full'}>
                    <InputNumber product={product} onChangeQuantity={onChangeQuantity}/>
                </div>
            </div>
        </div>
    );
}
