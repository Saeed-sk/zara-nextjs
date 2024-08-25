'use client'
import {ColorType, ProductType, SizeType} from "@/types";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {changePath} from "@/store/features/categorySlice";
import {useImageSrc} from "@/hooks/src";
import {BtnPrimary} from "@/components/default/buttons";
import Image from "next/image";
import ProductSwiper from "@/components/products/addCart/productSwiper";
import {addBasket} from "@/store/features/basketSlice";

export const AddCartSingle = ({product}: { product: ProductType }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changePath(''))
    }, []);

    function imagePath({src}) {
        return useImageSrc(src)
    }

    function changeSlide(index) {
        setSlideIndex(index)
    }

    const [basketItem, setBasketItem] = useState<ProductType>({
        id: product.id,
        colors: [],
        images: product.images,
        price: product.price,
        sizes: [],
    });

    function selectColor(color) {
        setBasketItem({...basketItem, colors: [color]})
    }

    function selectSize(size) {
        setBasketItem({...basketItem, sizes: [size]})
    }

    function addToBasket() {
        if (basketItem.colors.length > 0 && basketItem.sizes.length > 0) {
            dispatch(addBasket(basketItem))
        }else {
            alert('لطفا رنگ و سایز را انتخاب کنید')
        }
    }

    return (
        <>
            <section className={'grid grid-cols-1 sm:grid-cols-3 h-full p-14 gap-5 mx-auto max-w-[1280px]'}>
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
                    <div>
                        <div>
                            {product?.colors?.map((color, index) => {
                                return (
                                    <button onClick={() => selectColor(color)} key={index}
                                            className={`w-10 aspect-square border p-2 ${basketItem?.colors?.some((item:ColorType) => item.id === color.id) ? 'border-black' : 'border-gray-200'}`}>
                                        <div className={'w-full h-full'} style={{backgroundColor: color.color}}></div>
                                    </button>
                                )
                            })}
                        </div>
                        <div>
                            {product.sizes?.map((size, index) => {
                                return (
                                    <button onClick={() => selectSize(size)} key={index}
                                            className={`w-10 aspect-square border p-2 ${basketItem.sizes?.some((item: SizeType) => item.id === size.id) ? 'border-black' : 'border-gray-200'}`}>
                                        <div>
                                            <span>{size.size}</span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <BtnPrimary disabled={Boolean(basketItem.colors?.length === 0 || basketItem.sizes?.length === 0)} onClick={() => addToBasket()} className={'border-x-0 border-b-0 w-full justify-center'}>
                        اضافه کردن
                    </BtnPrimary>
                </div>
                <div className={'flex gap-3 items-end'}>
                    <div>
                        {product.images.map((image, index) => {
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
                    <ProductSwiper changeSlide={changeSlide} slideIndex={slideIndex}
                                   classes={'col-span-2 aspect-[1/1.2] mx-5'}
                                   images={product.images}/>
                </div>
                <div className={'border border-black self-end p-10 '}>
                    {product.maintenance}
                </div>
            </section>
        </>
    );
};