import Landing from "@/components/landing/landing";
import {CategoryProps} from "@/types";
import {getCategories} from "@/api/getCategories";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "ZARA - صفحه اصلی",
    description: "صفحه اصلی برای فروشگاه زارا فارسی",
};
const Home = () => {
    return (
        <>
            <main className={"w-full min-h-screen grid-cols-1"}>
                <Landing/>
            </main>
        </>
    )
}

export default Home
