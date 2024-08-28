import {setColorsFilter} from "@/store/features/filterSlice";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ColorType} from "@/types";
import {AnimatePresence, motion} from "framer-motion";
import {BtnPrimary} from "@/components/default/buttons";
import {AppDispatch, RootState} from "@/store/store";

export const Color = ({color, checked, handleColorChange}: {
    color: ColorType,
    checked: boolean,
    handleColorChange: (colorId: number) => void,
}) => {
    return (
        <label key={color.id}
               className={`p-2 border ${checked ? 'border-black' : 'border-gray-200'} flex flex-col items-center gap-3`}>
            <div className={'aspect-square cursor-pointer w-10'} style={{backgroundColor: color.color}}/>
            <input
                className={'hidden'}
                type="checkbox"
                checked={checked}
                onChange={() => handleColorChange(color.id)}
            />
            <p className={'text-xs'}>{color.name}</p>
        </label>
    );
}

export const Colors = ({allColors, selectedFilter, showColor, toggleColor}: {
    allColors: ColorType[],
    selectedFilter: any,
    showColor: boolean,
    toggleColor: () => void
}) => {
    const [selectedColors, setSelectedColors] = useState<Set<number>>(new Set(selectedFilter.colors));
    const dispatch = useDispatch<AppDispatch>();
    const hasColor = useSelector((state: RootState) => state.filter.selectedFilter.colors.length > 0);
    useEffect(() => {
        setSelectedColors(new Set(selectedFilter.colors));
    }, [selectedFilter,dispatch]);

    const handleResetSize = () => {
        setSelectedColors(new Set());
        dispatch(setColorsFilter([]));
    }
    const handleColorChange = (colorId: number) => {
        setSelectedColors(prevColors => {
            const updatedColors = new Set(prevColors);
            if (updatedColors.has(colorId)) {
                updatedColors.delete(colorId);
            } else {
                updatedColors.add(colorId);
            }
            const colorsArray = Array.from(updatedColors);
            dispatch(setColorsFilter(colorsArray));
            return updatedColors;
        });
    };
    if (showColor){
        return (
            <Fragment>
                <div className="flex gap-1 p-3 max-h-full flex-wrap">
                    {allColors?.map(color => {
                        return (
                            <Color key={color.id} color={color} handleColorChange={handleColorChange}
                                   checked={selectedColors.has(color.id)}/>
                        )
                    })}
                </div>
                <hr className={'border-black my-4'}/>
                <div className={'w-full flex border-t border-black'}>
                    <BtnPrimary className={'w-full justify-center border-none'}
                                onClick={toggleColor}>اعمال</BtnPrimary>
                    <hr className={'h-10 w-0.5 bg-black border-l border-black'}/>
                    <BtnPrimary disabled={!Boolean(hasColor)}
                                className={'w-full justify-center border-none'}
                                onClick={handleResetSize}>حذف</BtnPrimary>
                </div>
            </Fragment>
        )
    }
}