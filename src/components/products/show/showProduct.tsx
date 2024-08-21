'use client'
import React, {useEffect, useState} from 'react';
import {ProductType} from "@/types";
import ProductSwiper from "@/components/products/show/productSwiper";
import {BtnPrimary} from "@/components/default/buttons";
import {useDispatch} from "react-redux";
import {changePath} from "@/store/features/categorySlice";
import ShowMoreText from "react-show-more-text";
import {useImageSrc} from "@/hooks/src";

export const ShowSingleProduct = ({product}: {product: ProductType}) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changePath(''))
    }, []);

    return (
        <>
            <section className={'grid grid-cols-1 sm:grid-cols-3 h-full p-14 gap-5 mx-auto max-w-[1280px]'}>
                <div className={'col-span-1 border border-black mx-10 mb-10 flex flex-col justify-between max-'}>
                    <div className={'p-10 max-h-full'}>
                        <h4 className={''}>{product.title}</h4>
                        <div className={'flex flex-col'}>
                            <span>قیمت:{product.price}</span>
                            {Number(product.discount )> 1 && <span
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
                                    <button key={index} style={{backgroundColor: color.color}} className={'w-7 h-7'}/>
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
                    <div className={'w-20'}>
                        {product.images.map((image, index) => {
                            let src;
                            if (image.src.includes("via.placeholder.com")) {
                                src = image.src
                            } else {
                                src = process.env.IMAGE_DIRECTORY + image.src
                            }
                            return (
                                <img key={index} className={'cursor-pointer aspect-[1/1.3]'}
                                     onClick={() => setSlideIndex(index)}
                                     src={src} alt={product.title}/>
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

export const ShowCollectionProduct = ({product}: {product: ProductType}) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changePath(''))
    }, []);

    return (
        <>
            <section
                className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full p-5 md:p-14 gap-5 mx-auto max-w-[1280px] md:max-h-[60vh]'}>
                <div className={'col-span-1 border border-black mx-10 mb-10 flex flex-col justify-between max-h-full '}>
                    <div className={'p-10 max-h-full scrollBarMain overflow-y-auto'}>
                        <h4 className={''}>{product.title}</h4>
                        <div className={'flex flex-col'}>
                            <span>قیمت:{product.price}</span>
                            {Number(product.discount )> 1 && <span
                                className={'text-red-500'}> تخفیف:{Math.floor((Number(product.discount) * Number(product.price)) / 100)}</span>}
                        </div>
                        <div dangerouslySetInnerHTML={{__html: product.maintenance}}></div>
                    </div>
                    <div>
                        <div>
                            {product?.colors?.map((color, index) => {
                                return (
                                    <button key={index} style={{backgroundColor: color.color}} className={'w-7 h-7'}/>
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
                    <div className={'w-20'}>
                        {product.images.map((image, index) => {
                            return (
                                <img key={index} className={'cursor-pointer aspect-[1/1.3]'}
                                     onClick={() => setSlideIndex(index)}
                                     src={useImageSrc(image.src)} alt={product.title}/>
                            )
                        })}
                    </div>
                    <ProductSwiper slideIndex={slideIndex} classes={'col-span-2 aspect-[1/1.2] mx-5'}
                                   images={product.images}/>
                </div>
                <ShowMoreText
                    lines={3}
                    more="مشاهده بیشر"
                    less="مشاهده کمتر"
                    className="scrollBarMain overscroll-x-auto border border-black self-end p-10 scrollBar overflow-y-auto max-h-full"
                    anchorClass="show-more-less-clickable"
                    expanded={false}
                    width={280}
                    truncatedEndingComponent={"... "}
                >
                    <div dangerouslySetInnerHTML={{__html: product.maintenance}}></div>
                </ShowMoreText>
            </section>
        </>
    );
};
