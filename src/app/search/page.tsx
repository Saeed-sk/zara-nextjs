import { getCategories } from "@/api/getCategories";
import { CategoryProps } from "@/types";
import { Search } from "@/components/search/search";

export default async function Home() {
    const categories: CategoryProps[] = await getCategories();
    return (
        <main className={"w-full min-h-screen grid-cols-1"}>
            <Search categories={categories} />
        </main>
        
    );
};
