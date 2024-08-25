'use client'
import React, {Fragment, useEffect, useState} from 'react';
import Icon from "@/components/icon";
import Link from "next/link";
import Menu from "@/components/navbar/items/menu";
import {useDispatch, useSelector} from "react-redux";
import {changePath, fetchCategory, select} from "@/store/features/categorySlice";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion";
import {GridChange} from "@/components/products/gridChange";
import {AppDispatch, RootState} from "@/store/store";
import {NavLinks, NavLinksMoblie} from "@/components/navbar/items/navLinks";
import FilterProducts from "@/components/products/filter/filterProducts";


const Navbar = () => {
    const [inNav, setInNav] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const path = useSelector((state: RootState) => state.categories.path)
    const pathName = usePathname()
    const {allColors, allAttributes, allSizes, minPrice, maxPrice} = useSelector((state: RootState) => state.filter.filters)

    useEffect(() => {
        dispatch(fetchCategory())
    }, []);
    useEffect(() => {
        if (pathName === '/') {
            dispatch(changePath('home'))
        } else if (pathName === '/dashboard' || pathName === '/login' || pathName === '/register' || pathName === '/help' || pathName === '/cart') {
            dispatch(changePath(''))
        }
    }, [pathName]);

    function handleOutsideClick() {
        setOpen(false)
    }
    function toggleOpen() {
        setOpen(!open)
    }

    const categories = useSelector((state: RootState) => state.categories.categories)
    const selected = useSelector((state: RootState) => state.categories.selectedCategory)
    const loading = useSelector((state: RootState) => state.categories.isLoading)
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <ul onMouseLeave={() => {
                setInNav(false)
                setOpen(false)
            }} onMouseEnter={() => setInNav(true)}
                className={`w-full transition-all z-10 grid-cols-10 grid-rows-3 hidden md:grid px-8 pt-5 h-[29vh] fixed ${inNav ? 'bg-gray-50 bg-opacity-90' : 'bg-transparent'}`}>
                <li className="col-span-1 row-span-full flex flex-col h-full justify-between">
                    <button className={"text-2xl"} onClick={() => toggleOpen()}>
                        {open ? <Icon name={'close'}/> : <Icon name={'menu'}/>}
                    </button>
                    {path === 'product' && <GridChange classes={'mr-4 mb-2'}/>}
                </li>
                <li className={'col-span-3 row-span-2 flex items-start gap-10 relative'}>
                    <div className={`w-full ${open && 'border border-black bg-white'}`}>
                        <Link className={'mt-5 w-full'} href={'/'}>
                            <Icon name={'zara'} classes={'mt-5 w-3/5'}/>
                        </Link>
                        <div
                            className={`w-full ${open && 'absolute right-0 bg-white border border-black border-t-transparent'}`}>
                            {!loading && open &&
                                <Menu open={open} classes={''} toggleOpen={toggleOpen} selected={selected}
                                      categories={categories} />}
                        </div>
                    </div>
                </li>
                <li className={'col-start-6 col-span-3 row-span-1'}>
                    <Link
                        href={'/search'}>
                        <button
                            className={'border border-black px-4 py-1 w-full bg-white text-gray-400 font-light text-start'}>
                            جستجو
                        </button>
                    </Link>
                </li>
                <NavLinks />
                <li className={'col-start-2 col-end-10 row-span-1 flex items-end mt-10'}>
                    {!open && path === 'home' && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                    className={'flex flex-wrap gap-3 py-4 mx-5'}>
                            {categories?.map((category, index) => {
                                if (category.children.length) {
                                    return (
                                        <button className={`${index === selected && 'font-semibold'}`}
                                                key={category.id}
                                                onClick={() => {
                                                    dispatch(select(index));
                                                    setOpen(true)
                                                }}>
                                            {category.title}
                                        </button>
                                    );
                                }
                            })}
                        </motion.div>
                    )}
                    {!open && path === 'product' && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                    className={'flex flex-wrap gap-3 py-4 mx-5'}>
                            {/*TODO add filters to product page*/}
                            <FilterProducts min={minPrice} max={maxPrice} allColors={allColors} allSizes={allSizes} allAttributes={allAttributes}/>
                        </motion.div>
                    )}
                </li>

            </ul>
            <div onMouseLeave={() => setInNav(false)} onMouseEnter={() => setInNav(true)}
                 className={`w-full block md:hidden z-50 p-5 h-28 fixed ${!inNav ? 'bg-transparent' : 'bg-gray-50'}`}>
                <ul className={`w-full flex z-20 h-full justify-between`}>
                    <li className="flex flex-col h-full justify-between">
                        <button className={"text-2xl"} onClick={() => toggleOpen()}>
                            {open && <Icon name={'close'}/>}
                            {!open && <Icon name={'menu'}/>}
                        </button>

                    </li>
                    <NavLinksMoblie path={path}/>
                </ul>
                {
                    open &&
                    <Menu open={open} classes={'h-screen absolute w-full z-50 bg-gray-50 left-0 top-0'} categories={categories}
                          selected={selected} toggleOpen={toggleOpen}/>
                }
            </div>

        </Fragment>
    );
};

export default Navbar;
