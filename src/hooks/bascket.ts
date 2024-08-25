import {BasketType} from "@/types";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export function useInBasket(product: BasketType): boolean {
    const baskets:BasketType[] = useSelector((state:RootState) => state.basket.baskets);
    return baskets.some(
        (basket) =>
            basket.id === product.id &&
            basket.color?.id === product.color?.id &&
            basket.size?.id === product.size?.id
    );
}