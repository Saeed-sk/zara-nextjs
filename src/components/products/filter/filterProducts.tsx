"use client";
import React, {useState, useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setColorsFilter, setSizesFilter, setAttributesFilter, setPriceRangeFilter} from '@/store/features/filterSlice';
import {RootState} from '@/store/store';
import {ColorType, SizeType, AttributeType} from '@/types';
import {Colors} from "@/components/products/filter/colors";
import {Sizes} from "@/components/products/filter/sizes";
import {Attributes} from "@/components/products/filter/attributes";
import {PriceRange} from "@/components/products/filter/price";

interface FilterProps {
    allColors: ColorType[];
    allSizes: SizeType[];
    allAttributes: AttributeType[];
    min: number,
    max: number
}

const FilterComponent: React.FC<FilterProps> = ({allColors, allSizes, allAttributes, min, max}) => {
    const selectedFilter = useSelector((state: RootState) => state.filter.selectedFilter);
    const [showColor, setShowColor] = useState(false);
    const [showSize, setShowSize] = useState(false);
    const [showPrice, setShowPrice] = useState(false);

    function toggleColor() {
        setShowColor(!showColor)
        if (showSize) {
            setShowSize(false)
        }
        if (showPrice) {
            setShowPrice(false)
        }
    }
    // TODO make it responsive
    function toggleSize() {
        setShowSize(!showSize)
        if (showColor) {
            setShowColor(false)
        }
        if (showPrice) {
            setShowPrice(false)
        }
    }

    function togglePrice() {
        setShowPrice(!showPrice)
        if (showColor) {
            setShowColor(false)
        }
        if (showSize) {
            setShowSize(false)
        }
    }

    return (
        <div className="flex relative flex-col mt-1">

            <div className={'flex gap-2'}>
                <Attributes allAttributes={allAttributes} selectedFilter={selectedFilter}/>
            </div>

            <div className={'flex gap-2'}>
                {allColors?.length && (
                    <Fragment>
                        <button onClick={toggleColor}>
                            رنگ
                        </button>
                        <Colors allColors={allColors} selectedFilter={selectedFilter} showColor={showColor}
                                toggleColor={toggleColor}/>
                    </Fragment>
                )}
                {allSizes?.length && (
                    <Fragment>
                        <button onClick={toggleSize}>
                            سایز
                        </button>
                        <Sizes allSizes={allSizes} selectedFilter={selectedFilter} showSize={showSize}
                               toggleSize={toggleSize}/>
                    </Fragment>
                )}

                {allColors?.length && (
                    <Fragment>
                        <button onClick={togglePrice}>
                            قیمت
                        </button>
                        <PriceRange togglePrice={togglePrice} showPrice={showPrice} selectedFilter={selectedFilter}
                                    max={max} min={min}/>
                    </Fragment>

                )}
            </div>
        </div>
    );
};

export default FilterComponent;
