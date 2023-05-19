import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import EmptyResource from "@/components/ui/EmptyResource";
import { getAllProducts } from "@/utils/fetchDB";


export const metadata = {
    title: 'Products | M4M'
}

const Product = async ({ searchParams }: any) => {

    const products: Product[] = await getAllProducts(searchParams);
    return (
        <>
            <section className="mt-32 mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-5 grid-rows-5 gap-4">
                    {/* Sidebar */}
                    <Sidebar className='sidebar-grid-area' />

                    {/* Main Content */}
                    <div className="main-content-grid-area px-4 sm:px-6 lg:px-8">

                        <div className="">
                            {/* Breadcrumb */}
                            <Breadcrumb />
                        </div>

                        {/* Products */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {
                                products?.length > 0 ? products.map((product) => {
                                    return (
                                        <ProductCard key={product._id} product={product} />
                                    )
                                }) : <EmptyResource className="col-span-4 h-[70vh] flex flex-col justify-center items-center" width={250} />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Product