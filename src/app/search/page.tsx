import { Search } from "@/components/search/search";
import {getSearchDefaults} from "@/api/searchApi";

export default async function Home() {
    const products = await getSearchDefaults();
    return (
        <main className={"w-full min-h-screen grid-cols-1"}>
            <Search products={products}/>
        </main>
        
    );
};
