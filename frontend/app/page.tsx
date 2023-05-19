
import HeroSlider from "../components/HeroSlider";
import CategorySlider from "../components/CategorySlider";
import ProductSlider from "../components/ProductSlider";
import { getAllProducts } from "@/utils/fetchDB";

export default async function Home() {
    const products: Product[] = await getAllProducts();
    return (
        <>
            <section>
                <HeroSlider />
            </section>

            <section className="max-w-[1480px] mx-auto pt-16">
                <CategorySlider />
            </section>

            <section className="max-w-[1480px] mx-auto pt-16">
                <ProductSlider title="On Sale" products={products} />
            </section>
        </>
    )
}

