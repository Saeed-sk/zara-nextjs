'use client'
import {useState} from "react";
import {Baskets} from "@/components/cart/items/baskets";
import {Favorites} from "@/components/cart/items/favorites";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
export const Cart = () => {
    const [currentPage, setCurrentPage] = useState('basket')
    const basketItemsLength = useSelector((state: RootState) => state.basket.basketsCount)
    const favoriteItemsLength = useSelector((state: RootState) => state.favorite.favoritesCount)

    return (
        <section className={'w-full h-full z-30 flex flex-col'}>
            <div className={"w-full md:w-1/3 flex self-end justify-self-end border border-b-transparent border-black items-center justify-center text-sm"}>
                <button onClick={() => setCurrentPage('basket')}
                        className={`text-center w-full p-3 ${currentPage === 'basket' && 'font-semibold'}`}>
                    <span>سبد خرید</span>
                    <span>({basketItemsLength})</span>
                </button>
                <hr className={'h-full w-0.5 border-l border-black'}/>
                <button onClick={() => setCurrentPage('favorite')}
                        className={`w-full text-center p-3 ${currentPage === 'favorite' && 'font-semibold'}`}>
                    <span> علاقه مندی ها</span>
                    <span>({favoriteItemsLength})</span>
                </button>
            </div>
            <div className={'border-t border-black'}>
                {currentPage === 'basket' && <Baskets/>}
                {currentPage === 'favorite' && <Favorites/>}
            </div>
        </section>
    )
}