'use client'
import React, {useEffect, useState} from 'react';
import {ProductType} from "@/types";
import ProductSwiper from "@/components/products/show/productSwiper";
import {BtnPrimary} from "@/components/default/buttons";
import {useDispatch} from "react-redux";
import {changePath} from "@/store/features/categorySlice";
import ShowMoreText from "react-show-more-text";
import {useImageSrc} from "@/hooks/src";
import Image from "next/image";

export const ShowSingleProduct = ({product}: { product: ProductType }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changePath(''))
    }, []);

    function imagePath({src}) {
        return useImageSrc(src)
    }

    const [basketItem, setBasketItem] = useState({
        id: product.id,
        title: product.title,
        price: product.price,
        discount: product.discount,
        colors: [product.colors[0].color],
        sizes: [product.sizes[0].size],
        images: product.images
    });

    return (
        <>
            <section className={'grid grid-cols-1 sm:grid-cols-3 h-full p-14 gap-5 mx-auto max-w-[1280px]'}>
                <div className={'col-span-1 border border-black mx-10 mb-10 flex flex-col justify-between max-'}>
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
                    <div>
                        <div>
                            {product?.colors?.map((color, index) => {
                                return (
                                    <button key={index} className={`w-10 aspect-square border p-2 ${basketItem.colors.includes(color.color) ? 'border-black' : 'border-gray-200'}`}>
                                        <div className={'w-full h-full'} style={{backgroundColor: color.color}} ></div>
                                    </button>
                                )
                            })}
                        </div>
                        <div>
                            {product?.sizes?.map((size, index) => {
                                return (
                                    <span>
                                        {size.size}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <BtnPrimary className={'border-x-0 border-b-0 w-full justify-center'}>
                        اضافه کردن
                    </BtnPrimary>
                </div>
                <div className={'flex gap-3 items-end'}>
                    <div className={'w-20 aspect-product'}>
                        {product.images.map((image, index) => {
                            return (
                                <div key={index} className={'relative'} onClick={() => setSlideIndex(index)}>
                                    <Image fill
                                           className={'z-0 object-cover'}
                                           src={imagePath({src: image.src})}
                                           alt={product.title}
                                           sizes={'(width:100%)'}
                                           priority
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <ProductSwiper slideIndex={slideIndex} classes={'col-span-2 aspect-[1/1.2] mx-5'}
                                   images={product.images}/>
                </div>
                <div className={'border border-black self-end p-10 '}>
                    {product.maintenance}
                </div>
            </section>
        </>
    );
};

export const ShowCollectionProduct = ({product}: { product: ProductType }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changePath(''))
    }, []);

    function imagePath({src}) {
        return useImageSrc(src)
    }

    const [basketItem, setBasketItem] = useState({
        id: product.id,
        title: product.title,
        price: product.price,
        discount: product.discount,
        colors: [product.colors[0].color],
        sizes: [product.sizes[0].size],
        images: product.images
    });

    return (
        <>
            <section className={'grid grid-cols-1 sm:grid-cols-3 h-full p-14 gap-5 mx-auto max-w-[1280px]'}>
                <div className={'col-span-1 border border-black mx-10 mb-10 flex flex-col justify-between max-'}>
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
                    <div>
                        <div>
                            {product?.colors?.map((color, index) => {
                                return (
                                    <button key={index} className={`w-10 aspect-square border p-2 ${basketItem.colors.includes(color.color) ? 'border-black' : 'border-gray-200'}`}>
                                        <div className={'w-full h-full'} style={{backgroundColor: color.color}} ></div>
                                    </button>
                                )
                            })}
                        </div>
                        <div>
                            {product?.sizes?.map((size, index) => {
                                return (
                                    <span>
                                        {size.size}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <BtnPrimary className={'border-x-0 border-b-0 w-full justify-center'}>
                        اضافه کردن
                    </BtnPrimary>
                </div>
                <div className={'flex gap-3 items-end'}>
                    <div className={'w-20 aspect-product'}>
                        {product.images.map((image, index) => {
                            return (
                                <div key={index} className={'relative'} onClick={() => setSlideIndex(index)}>
                                    <Image fill
                                           className={'z-0 object-cover'}
                                           src={imagePath({src: image.src})}
                                           alt={product.title}
                                           sizes={'(width:100%)'}
                                           priority
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <ProductSwiper slideIndex={slideIndex} classes={'col-span-2 aspect-[1/1.2] mx-5'}
                                   images={product.images}/>
                </div>
                <div className={'border border-black self-end p-10 '}>
                    {product.maintenance}
                </div>
            </section>
        </>
    );
};
