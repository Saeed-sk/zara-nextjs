import React, {Fragment, useEffect, useState} from 'react';
import {setPriceRangeFilter} from "@/store/features/filterSlice";
import {useDispatch} from "react-redux";
import {AnimatePresence, motion} from "framer-motion";
import {BtnDanger, BtnPrimary} from "@/components/default/buttons";

export const PriceRange = ({selectedFilter,showPrice,togglePrice,min,max}:{selectedFilter:any,showPrice:boolean,togglePrice:() => void,max:number,min:number}) => {
    const dispatch = useDispatch();
    const [minPrice, setMinPrice] = useState<number | undefined>(selectedFilter.minPrice);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(selectedFilter.maxPrice);

    const handlePriceChange = () => {
        dispatch(setPriceRangeFilter({minPrice, maxPrice}));
    };

    useEffect(() => {
        setMinPrice(selectedFilter.minPrice);
        setMaxPrice(selectedFilter.maxPrice);
    }, [selectedFilter]);

    return (
    <Fragment>
        {showPrice && (
            <AnimatePresence>
                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{ opacity: 0, x: -100 }}
                            transition={{duration: 0.1}}
                            className={'flex flex-col absolute w-96 bg-gray-50 border top-full border-black'}>
                    <hr className={'border-black'}/>
                    <div className="flex gap-1 p-3 max-h-full flex-wrap">
                        <input
                            type="number"
                            value={minPrice || ''}
                            onChange={(e) => setMinPrice(e.target.value ? +e.target.value : undefined)}
                            placeholder="Min Price"
                        />
                        <input
                            type="number"
                            value={maxPrice || ''}
                            onChange={(e) => setMaxPrice(e.target.value ? +e.target.value : undefined)}
                            placeholder="Max Price"
                        />
                        <div className={'w-full flex gap-1'}>
                            <BtnPrimary className={'w-full justify-center'} onClick={handlePriceChange}>اعمال</BtnPrimary>
                            <BtnDanger className={'w-full justify-center'} onClick={togglePrice}>لغو</BtnDanger>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        )}
    </Fragment>
    );
};

