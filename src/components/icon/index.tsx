import React from "react";
import {IoCloseSharp} from "react-icons/io5";
import {TbMenu} from "react-icons/tb";
import {IoMdClose} from "react-icons/io";
import ZaraIcon from "@/components/icon/local/zaraIcon";
import OneGrid from "@/components/icon/local/oneGrid";
import TwoGrid from "@/components/icon/local/twoGrid";
import ThreeGrid from "@/components/icon/local/threeGrid";
import {CiSearch} from "react-icons/ci";
import {FaRegBookmark, FaBookmark} from "react-icons/fa";
import {GoPlus} from "react-icons/go";
import {MdAddShoppingCart} from "react-icons/md";
import { LuMinus } from "react-icons/lu";

type IconComponent = React.FC<{ className?: string }>;

interface Props {
    name: string;
    classes?: string;
}

const Icons: React.FC<Props> = ({classes = '', name}) => {
    let DynamicComponent: IconComponent;

    switch (name) {
        case 'zara':
            DynamicComponent = ZaraIcon;
            break;
        case 'grid':
            DynamicComponent = ThreeGrid;
            break;
        case 'plus':
            DynamicComponent = GoPlus;
            break;
        case 'gridTwo':
            DynamicComponent = TwoGrid;
            break;
        case 'gridOne':
            DynamicComponent = OneGrid;
            break;
        case 'search':
            DynamicComponent = CiSearch;
            break;
        case 'bookmark':
            DynamicComponent = FaRegBookmark;
            break;
        case 'bookmarked':
            DynamicComponent = FaBookmark;
            break;
        case 'menu':
            DynamicComponent = TbMenu;
            break;
        case 'addBasket':
            DynamicComponent = MdAddShoppingCart;
            break;
        case 'minus':
            DynamicComponent = LuMinus;
            break;
        case 'close':
            DynamicComponent = IoMdClose;
            break;
        default:
            DynamicComponent = IoCloseSharp;
    }

    return <DynamicComponent className={classes}/>;
};

export default Icons;
