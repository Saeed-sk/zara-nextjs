import {useSelector} from 'react-redux';
import {ProductType} from "@/types";
import {RootState} from "@/store/store";

export function useMarked(product: ProductType): boolean {
    const favorites:ProductType[] = useSelector((state:RootState) => state.favorite.favorites);
    return favorites.some(favorite => favorite.id === product.id);
}
