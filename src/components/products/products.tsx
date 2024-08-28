"use client";
import React, {useCallback, useEffect, useState} from 'react';
import {ProductShowInGrid} from "@/components/products/product";
import {getProducts} from "@/api/getProducts";
import {AttributeType, ColorType, SizeType} from "@/types";
import InfiniteScroll from 'react-infinite-scroll-component';
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {setInitialFilters, setProducts} from "@/store/features/filterSlice";
import {RootState} from "@/store/store";
import {changePath} from "@/store/features/categorySlice";
import {LoaderMd} from '../loader/loader';

interface AttrType {
    allAttributes: AttributeType[];
    allColors: ColorType[];
    allSizes: SizeType[];
    minPrice: number;
    maxPrice: number;
}

// Example component usage
export const Products = ({slug, attrs}: { slug: string; attrs: AttrType }) => {
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const filteredProducts = useSelector((state: RootState) => state.filter.filteredProducts);
    const products = useSelector((state: RootState) => state.filter.products);
    const pageGrids = useSelector((state: RootState) => state.gridStore.grid);

    useEffect(() => {
        dispatch(setInitialFilters(attrs));
    }, [attrs, dispatch]);

    useEffect(() => {
        dispatch(changePath('product'));
    }, [dispatch]);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProducts({ slug, page });
            setHasMore(data.pagination.currentPage < data.pagination.lastPage);
            setPage(prevPage => prevPage + 1);
            dispatch(setProducts(page === 1 ? data.products : [...products, ...data.products]));
        } catch (error) {
            console.error('Failed to load posts:', error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, page, products, slug]);

    useEffect(() => {
        if (hasMore && !loading) {
            fetchPosts();
        }
    }, [fetchPosts, hasMore, loading]);

    return (
        <>
            <InfiniteScroll
                dataLength={filteredProducts.length}
                next={fetchPosts}
                hasMore={hasMore}
                loader={<div className="m-24"><LoaderMd/></div>}
                endMessage={<p className="w-full text-center text-red-800 my-3">تمام محصولات را مشاهده کردید</p>}
            >
                <motion.section
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, ease: 'easeIn'}}
                    className={`w-full mx-auto grid divide-black mt-3 border-b border-black ${pageGrids === 12 && 'grid-cols-4 sm:grid-cols-12 divide-y divide-x'} ${pageGrids === 6 && 'grid-cols-2 sm:grid-cols-6 divide-y divide-x'} ${pageGrids === 4 && 'grid-cols-1 sm:grid-cols-4 gap-4'}`}
                >
                    {filteredProducts.map((product, index) => {
                        return (
                            <ProductShowInGrid
                                key={product.id}
                                product={product}
                                pageGrids={pageGrids}
                                single={true}
                                index={index}
                            />
                        );
                    })}
                </motion.section>
            </InfiniteScroll>
        </>
    );
};
