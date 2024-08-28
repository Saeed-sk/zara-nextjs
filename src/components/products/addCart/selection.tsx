import InputLabel from "@/components/default/inputLabel";
import Icons from "@/components/icon";
import React, {Fragment, SetStateAction} from "react";
import {BasketType, ColorType, SizeType} from "@/types";

export const ColorSelect: React.FC<
    {
        setBasketItem: React.Dispatch<React.SetStateAction<BasketType>>;
        basketItem: BasketType;
        colors: ColorType[]
    }> = ({colors, setBasketItem, basketItem}) => {
    function selectColor(color: ColorType) {
        setBasketItem({...basketItem, color: color})
    }
    return colors.map((color, index) => {
        return (
            <button onClick={() => selectColor(color)} key={index}
                    className={`w-10 aspect-square border p-2 ${basketItem.color?.id === color.id ? 'border-black' : 'border-gray-200'}`}>
                <div className={'w-full h-full'} style={{backgroundColor: color.color}}/>
            </button>
        )
    })
}
export const SizeSelect: React.FC<
    {
        setBasketItem: React.Dispatch<React.SetStateAction<BasketType>>;
        basketItem: BasketType;
        sizes: SizeType[]
    }> = ({sizes, setBasketItem, basketItem}) => {

    function selectSize(size: SizeType) {
        setBasketItem({...basketItem, size: size})
    }

    return sizes.map((size, index) => {
        return (
            <button onClick={() => selectSize(size)} key={index}
                    className={`w-10 aspect-square border p-2 ${basketItem.size?.id === size.id ? 'border-black' : 'border-gray-200'}`}>
                <div>
                    <span>{size.size}</span>
                </div>
            </button>
        )
    })
}

export const QuantitySelect: React.FC<{
    setBasketItem: React.Dispatch<React.SetStateAction<BasketType>>;
    basketItem: BasketType;
}> = ({setBasketItem, basketItem}) => {
    function handleChangeQuantity({type}: { type: string }) {
        if (type === 'plus') {
            setBasketItem({...basketItem, quantity: basketItem.quantity + 1});
        } else if (type === 'minus') {
            if (basketItem.quantity > 1) {
                setBasketItem({...basketItem, quantity: basketItem.quantity - 1});
            }
        }
    }

    return (
        <Fragment>
            <div className={`flex items-center justify-between border border-black gap-4`}>
                <button className={'border-l border-black h-full p-2'}
                        onClick={() => handleChangeQuantity({type: 'minus'})}>
                    <Icons name={'minus'}/>
                </button>
                <div className={''}>
                    {basketItem.quantity}
                </div>
                <button className={'border-r border-black h-full p-2'}
                        onClick={() => handleChangeQuantity({type: 'plus'})}>
                    <Icons name={'plus'}/>
                </button>
            </div>
        </Fragment>
    );
};
