import Icons from "@/components/icon";
import {useEffect, useState} from "react";
import {BasketType} from "@/types";

export const InputNumber = ({product, className, onChangeQuantity}: {
    product: BasketType,
    className?: string,
    onChangeQuantity: (value: number) => void
}) => {
    const [quantity, setQuantity] = useState(product.quantity);
    useEffect(() => {
        onChangeQuantity(quantity)
    }, [quantity , onChangeQuantity]);

    function handleChange({value, type}: { value: number, type: string }) {
        if (type === 'plus') {
            setQuantity(quantity + 1)
            onChangeQuantity(quantity)
        } else if (type === 'minus') {
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
        }
    }

    return (
        <div className={`flex items-center justify-between ${className} border border-black gap-4`}>
            <button className={'border-l border-black h-full p-2'}
                    onClick={() => handleChange({value: product.quantity, type: 'minus'})}>
                <Icons name={'minus'}/>
            </button>
            <div className={''}>
                {quantity}
            </div>
            <button className={'border-r border-black h-full p-2'}
                    onClick={() => handleChange({value: product.quantity, type: 'plus'})}>
                <Icons name={'plus'}/>
            </button>
        </div>
    )
}