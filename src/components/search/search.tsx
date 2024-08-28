'use client'
import {ProductType} from "@/types";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Icons from "../icon";
import {RootState} from "@/store/store";
import {SearchProducts} from "@/components/search/searchItems";
import {getSearchWithQuery} from "@/api/searchApi";
import LoadingCmp from "@/components/default/loadingCmp";

export const Search: React.FC<{ products: ProductType[] }> = ({products}) => {
    const [query, setQuery] = useState('');
    const selected = useSelector((state: RootState) => state.categories.selectedCategory)
    const [showDefaults, setShowDefaults] = useState(true);
    const [searchItems, setSearchItems] = useState<ProductType[] | []>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (query.length >= 2) {
            setLoading(true);
            getSearchWithQuery({query}).then(data => {
                setLoading(false)
                setSearchItems(data)
                setShowDefaults(false)
            })


        } else {
            setShowDefaults(true);
            setSearchItems([]);
        }
    }, [query]);
    return (
        <>
            <div className="w-full flex px-5 py-5 border-y border-black">
                <input
                    className="border-none outline-none w-full bg-gray-50"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} type="text"

                    value={query} placeholder="یک محصول ،رنگ ، کالکشن ...."/>
                {query.length > 0 && (
                    <button onClick={() => setQuery('')}>
                        <Icons name='close'/>
                    </button>
                )}
            </div>
            <section className={'grid grid-cols-3 md:grid-cols-5 divide-y divide-x divide-black mt-3 border-b border-black'}>
                {showDefaults && products.map((product,index) => (
                    <SearchProducts index={index} key={product.id} product={product}/>
                ))}
                {!showDefaults && searchItems.length === 0 && !loading &&  <p className={'col-span-full text-center mt-10'}>موردی یافت نشد</p>}
                {!showDefaults&& !loading && searchItems?.map((product,index) => (
                    <SearchProducts key={product.id} index={index} product={product}/>
                ))}
                {loading && <LoadingCmp/>}
            </section>
        </>
    )
}