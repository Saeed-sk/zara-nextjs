"use client";
import React, {useState, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {ColorType, SizeType, AttributeType} from '@/types';
import {Colors} from "@/components/products/filter/colors";
import {Sizes} from "@/components/products/filter/sizes";
import {AttributesComponent} from "@/components/products/filter/attributes";
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
        <div className="flex flex-col mt-1">
            <div className={'flex gap-2'}>
                <AttributesComponent allAttributes={allAttributes} selectedFilter={selectedFilter}/>
            </div>

            <div className={'flex gap-2'}>
                {allColors?.length && (
                    <button onClick={toggleColor}>
                        رنگ
                    </button>
                )}
                {allSizes?.length && (
                    <button onClick={toggleSize}>
                        سایز
                    </button>
                )}

                {allColors?.length && (
                    <button onClick={togglePrice}>
                        قیمت
                    </button>
                )}
            </div>
            <div className={`flex flex-col absolute bg-gray-50 w-full right-0 md:right-auto md:w-96 ${showColor && 'border'} ${ showSize && 'border'} ${ showPrice && 'border'} border-black top-full`}>
                <PriceRange togglePrice={togglePrice} showPrice={showPrice} selectedFilter={selectedFilter}
                            max={max} min={min}/>
                <Sizes allSizes={allSizes} selectedFilter={selectedFilter} showSize={showSize}
                       toggleSize={toggleSize}/>
                <Colors allColors={allColors} selectedFilter={selectedFilter} showColor={showColor}
                        toggleColor={toggleColor}/>
            </div>
        </div>
    );
};

export default FilterComponent;
