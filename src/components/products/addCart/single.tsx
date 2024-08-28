'use client'
import {BasketType, ColorType, ProductType, SizeType} from "@/types";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changePath} from "@/store/features/categorySlice";
import {getImageSrc} from "@/hooks/src";
import {BtnPrimary} from "@/components/default/buttons";
import Image from "next/image";
import ProductSwiper from "@/components/products/addCart/productSwiper";
import {
    addBasket,
    postProductToBasket,
    deleteProductFromBasket,
} from "@/store/features/basketSlice";
import {AppDispatch, RootState} from "@/store/store";
import InputLabel from "@/components/default/inputLabel";
import {InputNumber} from "@/components/default/InputNumber";
import Icons from "@/components/icon";
import {ColorSelect, QuantitySelect, SizeSelect} from "@/components/products/addCart/selection";

export const AddCartSingle = ({product}: { product: ProductType }) => {
    const baskets: BasketType[] = useSelector((state: RootState) => state.basket.baskets);
    const [slideIndex, setSlideIndex] = useState(0);
    const totalPrice = useSelector((state: RootState) => state.basket.totalPrice);
    const totalDiscount = useSelector((state: RootState) => state.basket.totalDiscount);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(changePath(''))
    }, [dispatch]);


    function imagePath({src}: { src: string }) {
        return getImageSrc(src)
    }

    function changeSlide(index: number) {
        setSlideIndex(index)
    }

    const [basketItem, setBasketItem] = useState<BasketType>({
        id: product.id,
        title: product.title,
        slug: product.slug,
        color: undefined,
        images: product.images,
        price: product.price,
        size: undefined,
        quantity: 0,
        discount: product.discount
    });


    function inBasket(product: BasketType): boolean {
        return baskets.some(
            (basket) =>
                basket.id === product.id &&
                basket.color?.id === product.color?.id &&
                basket.size?.id === product.size?.id
        );
    }

    function addToBasket() {
        const inItems = inBasket(basketItem)
        if (basketItem?.color?.id && basketItem?.size?.id) {
            dispatch(addBasket(basketItem))
            if (!inItems) {
                dispatch(postProductToBasket({product: basketItem, total_price: 20000}))
            } else {
                dispatch(deleteProductFromBasket({product: basketItem, total_price: 80000}))
            }
        } else {
            alert('لطفا رنگ و سایز را انتخاب کنید')
        }
    }

    return (
        <>
            <section className={'grid grid-cols-1 md:grid-cols-3 h-full p-14 gap-5 mx-auto max-w-[1280px]'}>
                <div className={'col-span-1 border border-black mx-10 mb-10 flex flex-col justify-between'}>
                    <div className={'p-10 max-h-full'}>
                        <h4 className={''}>{product.title}</h4>
                        <div className={'flex flex-col'}>
                            <span>قیمت:{product.price}</span>
                            {Number(product.discount) > 1 && <span
                                className={'text-red-500'}> تخفیف:{Math.floor((Number(product.discount) * Number(product.price)) / 100)}</span>}
                        </div>
                        <div>
                            {product.description}
                        </div>
                    </div>

                    <div className={'flex flex-col gap-4 p-3'}>
                        <div className={'flex flex-wrap'}>
                            <SizeSelect setBasketItem={setBasketItem} basketItem={basketItem} sizes={product.sizes}/>                    </div>
                        <div className={'flex flex-wrap'}>
                            <ColorSelect setBasketItem={setBasketItem} basketItem={basketItem} colors={product.colors}/>
                        </div>
                        <div className={'flex items-center w-full justify-center'}>
                            <QuantitySelect setBasketItem={setBasketItem} basketItem={basketItem}/>
                        </div>
                    </div>

                    <BtnPrimary
                        disabled={Boolean(!basketItem.color?.id || !basketItem.size?.id || basketItem.quantity < 1)}
                        onClick={() => addToBasket()} className={'border-x-0 border-b-0 w-full justify-center'}>
                        اضافه کردن
                    </BtnPrimary>
                </div>
                <div className={'flex gap-3 items-end'}>
                    <ProductSwiper changeSlide={changeSlide} slideIndex={slideIndex}
                                   classes={'col-span-2 aspect-[1/1.2] mx-5'}
                                   images={product.images}/>
                    <div>

                        {product?.images?.map((image, index) => {
                            return (
                                <div key={index}
                                     className={`relative w-10 aspect-product cursor-pointer ${index === slideIndex ? 'opacity-100' : 'opacity-60'}`}
                                     onClick={() => changeSlide(index)}>
                                    <Image fill
                                           className={'z-0 object-cover'}
                                           src={imagePath({src: image.src})}
                                           alt={String(product?.title)}
                                           sizes={'(width:100%)'}
                                           priority
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={'border border-black self-end p-10 '}>
                    {product.maintenance}
                </div>
            </section>
        </>
    );
};