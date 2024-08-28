'use client'
import {useState} from "react";
import {Baskets} from "@/components/cart/items/baskets";
import {Favorites} from "@/components/cart/items/favorites";
export const Cart = () => {
    const [currentPage, setCurrentPage] = useState('basket')
    return (
        <section className={'w-full h-full z-30'}>
            <div className={"border-y h-14 border-black flex justify-around sm:justify-start text-sm divide-x divide-black"}>
                <hr className={'h-full w-[0.25px] bg-black hidden sm:block'}/>
                <button onClick={() => setCurrentPage('basket')}
                        className={`text-center w-full sm:px-10 ${currentPage === 'basket' && 'underline underline-offset-2'}`}>
                    سبد خرید
                </button>

                <button onClick={() => setCurrentPage('favorite')}
                        className={`w-full text-center sm:px-10 ${currentPage === 'favorite' && 'underline underline-offset-2'}`}>
                    علاقه مندی ها
                </button>
            </div>
            <div>
                {currentPage === 'basket' && <Baskets/>}
                {currentPage === 'favorite' && <Favorites/>}
            </div>
        </section>
    )
}