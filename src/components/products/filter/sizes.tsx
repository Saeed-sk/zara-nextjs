import {setSizesFilter} from "@/store/features/filterSlice";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {SizeType} from "@/types";
import {AnimatePresence, motion} from "framer-motion";
import Icons from "@/components/icon";
import {BtnPrimary} from "@/components/default/buttons";
import {AppDispatch} from "@/store/store";

export const Size = ({size, checked, handleSizeChange}: {
    size: SizeType,
    checked: boolean,
    handleSizeChange: (sizeId: number) => void,
}) => {
    return (
        <label
            className={`w-8 cursor-pointer text-center aspect-square border block ${checked ? 'border-black' : 'border-gray-200'}`}
            key={size.id}>
            <input
                type="checkbox"
                className={'hidden'}
                checked={checked}
                onChange={() => handleSizeChange(size.id)}
            />
            {size.size}
        </label>
    );
}
export const Sizes = ({allSizes, selectedFilter, showSize, toggleSize}: {
    allSizes: SizeType[],
    selectedFilter: any,
    showSize: boolean,
    toggleSize: () => void
}) => {
    const [selectedSizes, setSelectedSizes] = useState<Set<number>>(new Set(selectedFilter.sizes));
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        setSelectedSizes(new Set(selectedFilter.sizes));
    }, [selectedFilter,dispatch]);
    const handleSizeChange = (sizeId: number) => {
        setSelectedSizes(prevSizes => {
            const updatedSizes = new Set(prevSizes);
            if (updatedSizes.has(sizeId)) {
                updatedSizes.delete(sizeId);
            } else {
                updatedSizes.add(sizeId);
            }
            const sizesArray = Array.from(updatedSizes);
            dispatch(setSizesFilter(sizesArray));
            return updatedSizes;
        });
    };

    const handleResetSize = () => {
        setSelectedSizes(new Set());
        dispatch(setSizesFilter([]));
    };
    if (showSize){
        return(
            <Fragment>
                <div className="flex gap-1 p-3 max-h-full flex-wrap">
                    {allSizes?.map(size => {
                        return (
                            <Size key={size.id} size={size} checked={selectedSizes.has(size.id)}
                                  handleSizeChange={handleSizeChange}/>
                        )
                    })}
                </div>
                <hr className={'border-black my-4'}/>
                <div className={'w-full flex border-t border-black divide-x'}>
                    <BtnPrimary className={'w-full justify-center border-none'}
                                onClick={toggleSize}>اعمال</BtnPrimary>
                    <BtnPrimary disabled={Boolean(selectedSizes.size === 0)} className={'w-full justify-center border-none'}
                                onClick={handleResetSize}>حذف</BtnPrimary>
                </div>
            </Fragment>
        )
    }
}