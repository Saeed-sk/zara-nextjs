import React from 'react';
import {CategoryProps} from "@/types";
import Link from "next/link";
import Collapsible from 'react-collapsible';


const Category = ({category, toggleOpen}: { category: CategoryProps, toggleOpen: () => void }) => {
    if (category.children.length) {
        if (category.title === 'فروش') {
            return (
                <div className={'flex flex-col w-full mb-1 p-2 '}>
                    <Collapsible className={'bg-green-500'} trigger={`${category.title}`}>
                        <div className={'bg-green-500'} style={{paddingRight: +10 + 'px'}}>
                            {category.children.map(child => <Category toggleOpen={toggleOpen} key={child.id}
                                                                      category={child}/>)}
                        </div>
                    </Collapsible>
                </div>
            )
        } else {
            return (
                <div className={'flex flex-col w-full p-2'}>
                    <Collapsible className={''} trigger={`${category.title}`}>
                        {category.children.map(child => <Category toggleOpen={toggleOpen} key={child.id}
                                                                  category={child}/>)}
                    </Collapsible>
                </div>
            )
        }
    } else {
        return (
            <div className={"my-1 py-1 text-sm"} onClick={toggleOpen} style={{paddingRight: +10 + 'px'}}>
                <Link href={`/${category.slug}`}>{category.title}</Link>
            </div>
        )
    }
};

export default Category;