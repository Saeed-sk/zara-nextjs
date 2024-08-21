import '@/app/global.scss'
import {StoreProvider} from "@/store/StoreProvider";
import Navbar from "@/components/navbar/navbar";
import { RectFcChildren } from '@/types';

export const metadata = {
    title: 'ZARA - فروشگاه اینترنتی مد و پوشاک',
}
const RootLayout:React.FC<RectFcChildren>  = ({children}) => {
    return (
        <StoreProvider>
            <html dir={'rtl'} lang="fa-IR">
            <body className={'relative bg-gray-50'}>
            <header>
                <Navbar/>
            </header>
            <main className={'grid grid-cols-1 bg-gray-50'}>
                {children}
            </main>
            </body>
            </html>
        </StoreProvider>
    )
}


export default RootLayout
