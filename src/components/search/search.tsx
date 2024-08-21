'use client'
import { CategoryProps, ProductType } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../icon";
import {RootState} from "@/store/store";

export const Search: React.FC<{ categories: CategoryProps[] }> = ({ categories }) => {
    const [params, setparams] = useState('')
    const selected = useSelector((state:RootState) => state.categories.selectedCategory)
    const category = categories[selected];
    const [products, setproducts] = useState<ProductType[] | undefined>()

    return (
        <>
            <div className="w-full flex px-5 py-5 border-y border-black">
                <input
                    className="border-none outline-none w-full bg-gray-50" onChange={(event: ChangeEvent<HTMLInputElement>) => setparams(event.target.value)} type="text"
                    value={params} placeholder="یک محصول ،رنگ ، کالکشن ...." />
                {params.length > 0 && (
                    <button onClick={() => setparams('')}>
                        <Icons name='close' />
                    </button>
                )}
            </div>
        </>
    )
}