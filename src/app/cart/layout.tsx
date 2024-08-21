import { RectFcChildren } from '@/types'
import React from 'react'

export const metadata = {
    title: 'ZARA - فروشگاه اینترنتی مد و پوشاک',
}
const Layout:React.FC<RectFcChildren> = ({children}) => {
    return (
        <section className={'grid grid-cols-1 bg-gray-50 pt-28 md:pt-56'}>
            {children}
        </section>
    )
}


export default Layout
