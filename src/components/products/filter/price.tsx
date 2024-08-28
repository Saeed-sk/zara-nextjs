import React, {Fragment, useEffect, useState} from 'react';
import {setPriceRangeFilter} from "@/store/features/filterSlice";
import {useDispatch} from "react-redux";
import {AnimatePresence, motion} from "framer-motion";
import {BtnPrimary} from "@/components/default/buttons";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import {AppDispatch} from "@/store/store";


export const PriceRange = ({selectedFilter, showPrice, togglePrice, min, max}: {
    selectedFilter: any,
    showPrice: boolean,
    togglePrice: () => void,
    max: number,
    min: number
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [minPrice, setMinPrice] = useState<number | undefined>(selectedFilter.minPrice);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(selectedFilter.maxPrice);

    const handlePriceChange = () => {
        dispatch(setPriceRangeFilter({minPrice, maxPrice}));
        togglePrice();
    };
    const handleResetPriceChange = () => {
        dispatch(setPriceRangeFilter({ minPrice: min, maxPrice: max }));
        setMaxPrice(max);
        setMinPrice(min);
    };

    useEffect(() => {
        setMinPrice(selectedFilter.minPrice);
        setMaxPrice(selectedFilter.maxPrice);
    }, [selectedFilter,dispatch]);

    if (showPrice){
       return (
           <Fragment>
               <div className="flex gap-1 p-3 max-h-full flex-wrap">
                   <div dir={'rtl'} className="w-full flex justify-between">
                       <span className={`${maxPrice === max && 'font-semibold'}`}>{maxPrice} تومان</span>
                       <span className={`${minPrice === min && 'font-semibold'}`}>{minPrice} تومان</span>
                   </div>
                   <div className='w-full' dir={'ltr'}>
                       <MultiRangeSlider
                           min={min}
                           max={max}
                           step={500}
                           stepOnly={true}
                           ruler={false}
                           baseClassName={'multi-range-slider'}
                           minValue={minPrice? minPrice : min}
                           maxValue={maxPrice ? maxPrice : max}
                           onInput={(e: ChangeResult) => {
                               setMinPrice(e.minValue);
                               setMaxPrice(e.maxValue);
                           }}
                       ></MultiRangeSlider>
                   </div>
               </div>
               <hr className={'h-1 my-2 border-gray-700'}/>
               <div className={'w-full flex border-t border-black'}>
                   <BtnPrimary className={'w-full justify-center border-none'}
                               onClick={handlePriceChange}>اعمال</BtnPrimary>
                   <hr className={'h-10 w-0.5 bg-black border-l border-black'}/>
                   <BtnPrimary disabled={Boolean(minPrice === min && maxPrice === max)} className={'w-full justify-center border-none'} onClick={handleResetPriceChange}>حذف</BtnPrimary>
               </div>
           </Fragment>
       )
    }

};

