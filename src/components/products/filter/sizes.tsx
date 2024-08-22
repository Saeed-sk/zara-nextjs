import {setSizesFilter} from "@/store/features/filterSlice";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {SizeType} from "@/types";
import {AnimatePresence, motion} from "framer-motion";
import Icons from "@/components/icon";
import {BtnPrimary} from "@/components/default/buttons";

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
    const dispatch = useDispatch();
    useEffect(() => {
        setSelectedSizes(new Set(selectedFilter.sizes));
    }, [selectedFilter]);
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
    return (
        <Fragment>
            {showSize && (
                <AnimatePresence>
                    <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, x: -100}}
                                transition={{duration: 0.1}}
                                className={'flex flex-col absolute w-96 bg-gray-50 border top-full border-black'}>

                        <div className="flex gap-1 p-3 max-h-full flex-wrap">
                            {allSizes?.map(size => {
                                return (
                                    <Size key={size.id} size={size} checked={selectedSizes.has(size.id)}
                                          handleSizeChange={handleSizeChange}/>
                                )
                            })}
                        </div>
                        <hr className={'border-black my-4'}/>
                        <div className={'w-full flex border-t border-black'}>
                            <BtnPrimary className={'w-full justify-center border-none'}
                                        onClick={toggleSize}>اعمال</BtnPrimary>
                            <hr className={'h-10 w-0.5 bg-black border-l border-black'}/>
                            <BtnPrimary disabled={Boolean(selectedSizes.size === 0)} className={'w-full justify-center border-none'}
                                        onClick={handleResetSize}>حذف</BtnPrimary>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </Fragment>
    )
}