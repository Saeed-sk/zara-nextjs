import React, {useLayoutEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import {Scrollbar} from 'swiper/modules';
import {ImageType} from "@/types";
import {Swiper as SwiperType} from "swiper";
import {getImageSrc} from "@/hooks/src";
import Image from "next/image";

const ProductSwiper = ({images, classes, slideIndex, changeSlide}: {
    images: ImageType[] | undefined,
    classes?: string,
    slideIndex: number,
    changeSlide: (index: number) => void
}) => {
    const ref = useRef<SwiperType | null>();
    useLayoutEffect(() => {
        if (ref.current) {
            ref?.current?.slideTo(slideIndex);
        }
    });

    function imagePath(src: string) {
        return getImageSrc(src);
    }

    return (
        <Swiper
            scrollbar={{
                hide: false,
                draggable: true,
            }}
            direction={'vertical'}
            onSlideChange={(swiper) => (changeSlide(swiper.activeIndex))}
            modules={[Scrollbar]}
            onSwiper={(swiper) => (ref.current = swiper)}
            className={`w-full h-full aspect-product ${classes}`}
        >
            {images?.map((image, index) => {
                return (
                    <SwiperSlide className={''} key={index}>
                        <div className={'w-full h-full'}>
                            <Image fill
                                   className={'z-0 object-cover'}
                                   src={imagePath(image.src)}
                                   alt={'عکس محصولات'}
                                   sizes={'(width:100%)'}
                                   priority
                            />
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default ProductSwiper;
