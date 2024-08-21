import {setColorsFilter} from "@/store/features/filterSlice";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {ColorType} from "@/types";
import {AnimatePresence, motion} from "framer-motion";
import Icons from "@/components/icon";

export const Color = ({color, checked, handleColorChange}: {
    color: ColorType,
    checked: boolean,
    handleColorChange: (colorId: number) => void,
}) => {
    return (
        <label key={color.id}
               className={`aspect-square border-2 cursor-pointer p-5 ${checked ? 'border-black' : 'border-transparent'} `}
               style={{backgroundColor: color.color}}>
            <input
                className={'hidden'}
                type="checkbox"
                checked={checked}
                onChange={() => handleColorChange(color.id)}
            />
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
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedColors(new Set(selectedFilter.colors));
    }, [selectedFilter]);
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
        return (
            <Fragment>
                {showColor&& (
                    <AnimatePresence>
                        <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{ opacity: 0, x: -100 }}
                                    transition={{duration: 0.1}}
                                    className={'flex flex-col absolute w-96 bg-gray-50 border top-full border-black'}>
                            <button className={'p-2'} onClick={toggleColor}>
                                <Icons name={'close'}/>
                            </button>
                            <hr className={'border-black'}/>
                            <div className="flex gap-1 p-3 max-h-full flex-wrap">
                                {allColors?.map(color => {
                                    return (
                                        <Color key={color.id} color={color} handleColorChange={handleColorChange}
                                               checked={selectedColors.has(color.id)}/>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </Fragment>
        )
}