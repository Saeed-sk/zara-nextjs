import React, {useRef, useState} from 'react';
import ScrollContainer from "react-indiana-drag-scroll";
import {CategoryProps} from "@/types";
import {motion} from "framer-motion";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Swiper as SwiperRef } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import {Navigation} from 'swiper/modules';
import Category from "@/components/navbar/items/category";
import {useDispatch, useSelector} from "react-redux";
import {select} from "@/store/features/categorySlice";
import Icon from "@/components/icon";
import {AppDispatch, RootState} from "@/store/store";

interface Props {
    categories?: CategoryProps[];
    selected: number,
    classes?: string,
    toggleOpen: () => void,
    open:boolean
}

const Menu = ({categories, selected, classes, toggleOpen,open}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const ref = useRef<SwiperRef | null>(null);
    const slideIndex = useSelector((state:RootState) => state.categories.selectedCategory);

    function handleClick(index:number) {
        if (ref.current) {
            ref.current?.slideTo(index);
        }
        dispatch(select(index));
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className={`${classes} w-full scrollBar`}>
            <button className={"text-2xl w-full pt-5 pr-5 block md:hidden"} onClick={() => toggleOpen()}>
                {open && <Icon name={'close'}/>}
                {!open && <Icon name={'menu'}/>}
            </button>
            <ScrollContainer hideScrollbars={false} className="w-full flex gap-4 py-4 px-4 text-sm">
                {categories?.map((category, index) => {
                        return (<button onClick={() => {
                            handleClick(index);
                        }} className={`${index === selected && 'font-semibold'}`}
                                        key={category.id}>{category.title}</button>)
                    }
                )}
            </ScrollContainer>
            <div className={"border-t border-black p-4 w-full"}>
                <Swiper onSlideChange={swiper => dispatch(select(swiper.activeIndex))} modules={[Navigation]}
                        onSwiper={swiper => ref.current = swiper} className="h-[80vh] md:h-[300px] w-full">
                    {categories?.map((category, index) => (
                        <SwiperSlide className={'w-full overflow-y-auto'} key={category.id}>
                            {category.children.map((child, index) => (
                                <Category toggleOpen={toggleOpen} key={index} category={child}/>
                            ))}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
};

export default Menu;
