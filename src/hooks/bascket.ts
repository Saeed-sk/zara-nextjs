import {ProductType} from "@/types";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export function useInBasket(product: ProductType): boolean {
    const baskets:ProductType[] = useSelector((state:RootState) => state.basket.baskets);
    return baskets.some(basket => basket.id === product.id);
}