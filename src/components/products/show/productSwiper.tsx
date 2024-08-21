import React, {useLayoutEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import {Scrollbar} from 'swiper/modules';
import {ImageType} from "@/types";
import {Swiper as SwiperType} from "swiper";
import {useImageSrc} from "@/hooks/src";

const ProductSwiper = ({images, classes, slideIndex}: {
    images: ImageType[],
    classes?: string,
    slideIndex: number
}) => {
    const ref = useRef<SwiperType | null>();
    useLayoutEffect(() => {
        if (ref.current) {
            ref?.current?.slideTo(slideIndex);
        }
    });

    return (
        <Swiper
            scrollbar={{
                hide: false,
                draggable: true,
            }}
            direction={'vertical'}
            modules={[Scrollbar]}
            onSwiper={(swiper) => (ref.current = swiper)}
            className={`mySwiper ${classes}`}
        >
            {images.map((image, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img className={'w-full h-full'} src={`${useImageSrc(image.src)}`} alt={image.src}/>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default ProductSwiper;
