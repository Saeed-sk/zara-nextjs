"use client";
import React, {Fragment, useEffect, useLayoutEffect, useRef} from "react";
import {CategoryProps} from "@/types";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperType} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import {useDispatch, useSelector} from "react-redux";
import {changePath, fetchCategory, select} from "@/store/features/categorySlice";
import Link from "next/link";
import {LinksSlide} from "@/components/landing/linksSlide";
import Image from "next/image";
import {RootState} from "@/store/store";
import {useImageSrc} from "@/hooks/src";
import Loading from "@/app/Loading";

const Landing: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.categories);
    const ref = useRef<SwiperType | null>(null);
    const dispatch = useDispatch();
    const slideIndex = useSelector((state: RootState) => state.categories.selectedCategory);
    useLayoutEffect(() => {
        if (ref.current) {
            ref?.current?.slideTo(slideIndex);
        }
    });
    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(changePath('home'));
    }, []);

    function hasChildren(category: CategoryProps): CategoryProps[] {
        let children: CategoryProps[] = [];

        function traverse(category: CategoryProps) {
            if (category.children && category.children.length >= 1) {
                category.children.forEach((child) => traverse(child));
            } else {
                children.push(category);
            }
        }

        traverse(category);
        return children;
    }

    if (categories === undefined) {
        return <><Loading/></>;
    }
    return (
        <Fragment>
            <Swiper
                onSlideChange={(swiper) => dispatch(select(swiper.activeIndex))}
                modules={[Navigation]}
                navigation={true}
                onSwiper={(swiper) => (ref.current = swiper)}
                className="h-screen w-full"
            >
                {/* make dynamic banners to landing start */}
                {categories.map((category) => {
                    return (
                        <SwiperSlide
                            className={
                                "w-full h-screen text-black grid grid-cols-1 overflow-y-hidden "
                            }
                            key={category.id}
                        >
                            <Swiper
                                modules={[Navigation]}
                                className="h-screen w-full swiper-v"
                                direction={'vertical'}
                            >
                                <>
                                    {category?.banners.map((banner) => {
                                        // TODO fix this when slug added to banner
                                        return (
                                            <SwiperSlide key={banner.id} className={'w-full h-screen'}>
                                                {/*<p className={'absolute right-12 bottom-12 md:right-24 md:bottom-24 text-white'}>/{child.slug}</p>*/}
                                                <Link className="" href={`/`} passHref>
                                                {/*<Link className="" href={`/${banner.slug}`} passHref>*/}
                                                    <div className="w-full h-full relative">
                                                        <Image
                                                            fill
                                                            className="h-full object-cover md:w-full"
                                                            src={`${useImageSrc(banner.src)}`}
                                                            // alt={banner.slug + ' عکس نمایه '}
                                                            alt={' عکس نمایه '}
                                                        />
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    })}
                                    {/* make dynamic banners to landing end */}
                                    <SwiperSlide>
                                        <LinksSlide/>
                                    </SwiperSlide>
                                </>
                            </Swiper>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Fragment>
    );
};

export default Landing;