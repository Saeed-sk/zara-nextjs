'use client'
import { CategoryProps, ProductType } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../icon";
import {RootState} from "@/store/store";

export const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const selected = useSelector((state:RootState) => state.categories.selectedCategory)
    const [showDefaults, setShowDefaults] = useState(true);
    // TODO add search query to backend and front
    return (
        <>
            <div className="w-full flex px-5 py-5 border-y border-black">
                <input
                    className="border-none outline-none w-full bg-gray-50" onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} type="text"
                    value={query} placeholder="یک محصول ،رنگ ، کالکشن ...." />
                {query.length > 0 && (
                    <button onClick={() => setQuery('')}>
                        <Icons name='close' />
                    </button>
                )}
            </div>
        </>
    )
}