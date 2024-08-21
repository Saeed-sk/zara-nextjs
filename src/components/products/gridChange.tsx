import Icons from "@/components/icon";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {setGrid} from "@/store/features/gridSlice";

export const GridChange = ({classes}: { classes?: string }) => {
    const pageGrids = useSelector((state: RootState) => state.gridStore.grid);
    const dispatch = useDispatch();
    return (
        <div className={`flex justify-start text-xl ${classes} `}>
            <div className="flex gap-2">
                <button className={`${pageGrids === 12 ? 'border-b-2 border-red-500' : ''}`}
                        onClick={() => dispatch(setGrid(12))}>
                    <Icons name="grid"/>
                </button>
                <button className={`${pageGrids === 6 ? 'border-b-2 border-red-500' : ''}`}
                        onClick={() => dispatch(setGrid(6))}>
                    <Icons name="gridTwo"/>
                </button>
                <button className={`${pageGrids === 4 ? 'border-b-2 border-red-500' : ''}`}
                        onClick={() => dispatch(setGrid(4))}>
                    <Icons name="gridOne"/>
                </button>
            </div>
        </div>
    )
}