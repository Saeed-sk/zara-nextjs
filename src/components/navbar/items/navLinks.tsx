import React from 'react';
import Link from "next/link";
import Icon from "@/components/icon";
import {GridChange} from "@/components/products/gridChange";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export const NavLinksMoblie = ({path}: {path: string}) => {
    const cartItemLen = useSelector((state: RootState) => state.basket.basketsCount)
    const userInfo = useSelector((state: RootState) => state.userInfo.user)
    const status = useSelector((state: RootState) => state.userInfo.status)
    return (
        <li className={'flex flex-col items-end gap-2 justify-between'}>
            <div className={'flex justify-center gap-3'}>
                <Link href={'/search'}>
                    <Icon name={'search'} classes={'mt-1 text-xl'}/>
                </Link>
                {userInfo ? <Link href={'/dashboard'}>داشبورد </Link> : <Link href={'/login'}>ورود</Link>}
                <Link href={'/cart'}>
                    <span>سبد خرید</span>
                    <span className={'pr-2'}>({cartItemLen})</span>
                </Link>
            </div>
            {path === 'product' && <GridChange/>}
        </li>
    );
};

export const NavLinks = () => {
    const cartItemLen = useSelector((state: RootState) => state.basket.basketsCount)
    const userInfo = useSelector((state: RootState) => state.userInfo?.user)
  return (
      <li className={'col-start-9 col-span-2 row-span-1 flex gap-5 text-sm justify-end'}>
          {userInfo ? <Link href={'/dashboard'}>داشبورد </Link> : <Link href={'/login'}>ورود</Link>}
          <Link href={'/help'}>کمک</Link>
          <Link href={'/cart'}>
              <span>سبد خرید</span>
              <span className={'pr-2'}>({cartItemLen})</span>
          </Link>
      </li>
  )
}

