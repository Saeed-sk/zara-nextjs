'use client'
import {useState} from "react";
import Baskets from "@/components/cart/items/baskets";
import {Favorites} from "@/components/cart/items/favorites";
import Shopping from "@/components/cart/items/shopping";

export const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState('basket')
    return (
        <section className={'w-full h-full z-30'}>
            <div className={"border h-14 border-black flex justify-around sm:justify-start text-sm"}>
                <hr className={'h-full w-[0.25px] bg-black hidden sm:block'}/>
                <button onClick={() => setCurrentPage('basket')}
                        className={`border-black text-center w-full sm:px-10 ${currentPage === 'basket' && 'underline underline-offset-2'}`}>
                    سبد خرید
                </button>
                <hr className={'h-full w-[0.25px] bg-black '}/>
                <button onClick={() => setCurrentPage('favorite')}
                        className={`border-black w-full text-center sm:px-10 ${currentPage === 'favorite' && 'underline underline-offset-2'}`}>
                    علاقه مندی ها
                </button>
                <hr className={'h-full w-[0.25px] bg-black '}/>
                <button onClick={() => setCurrentPage('shopping')}
                        className={`border-black w-full text-center sm:px-10 ${currentPage === 'shopping' && 'underline underline-offset-2'}`}>
                    خرید ها
                </button>
                <hr className={'h-full w-[0.25px] bg-black hidden sm:block'}/>
            </div>
            <div>
                {currentPage === 'basket' && <Baskets/>}
                {currentPage === 'favorite' && <Favorites/>}
                {currentPage === 'shopping' && <Shopping/>}
            </div>
        </section>
    )
}