import React from 'react';
import {addFavorite, deleteFavoriteAsync, postFavoriteAsync} from "@/store/features/favoritesSlice";
import Icons from "@/components/icon";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {useRouter} from "next/navigation";
import {useMarked} from "@/hooks/favorites";
import {ProductType} from "@/types";


export const AddFavorites = ({product}:{product:ProductType}) => {
    const user = useSelector((state: RootState) => state.userInfo?.user)
    const loading = useSelector((state: RootState) => state.favorite.isLoading)
    const router = useRouter();
    const isMarked = useMarked(product);
    const dispatch = useDispatch<AppDispatch>()
    function handleAddFavorite() {
        if (!user) {
            router.push('/login');
            return;
        }
        if (loading) {
            return;
        }
        if (isMarked) {
            dispatch(deleteFavoriteAsync(product))
        } else {
            dispatch(postFavoriteAsync(product))
        }
    }

    return (
        <button disabled={loading} onClick={handleAddFavorite} className={'text-sm ml-1'}>
            {isMarked ? <Icons name={'bookmarked'}/> : <Icons name={'bookmark'}/>}
        </button>
    );
};

export default AddFavorites;
