import { Metadata } from 'next';
import Breadcrumb from "@/components/Breadcrumb";
import ProductImage from "@/components/ui/ProductImage";
import { getAllProducts, getProductById } from "@/utils/fetchDB";
import VariationList from '@/components/VariationList';

type ParamProps = {
    params: { id: string };
};

export async function generateStaticParams() {
    const products: Product[] = await getAllProducts();
    return products.map(product => ({
        id: product._id,
    }));
}

export async function generateMetadata({ params }: ParamProps): Promise<Metadata> {
    // fetch data
    const { product }: { product: Product } = await getProductById(params.id);
    return {
        title: product.itemname,
        openGraph: {
            images: `https://www.m4mformen.com/${product.itemimage}`,
        },
    };
}

const SingleProduct = async ({ params }: ParamProps) => {
    const { id } = params;
    const { product } = await getProductById(id);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.itemname,
        image: `https://www.m4mformen.com/${product.itemimage}`,
    };
    return (
        <>
            {/* Add JSON-LD to your page */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-[1480px] mx-auto pt-8">
                <div className='px-2 sm:px-0'>
                    <Breadcrumb />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 auto-cols-min sm:gap-5">
                    <div className="relative sm:h-2/3 mx-2 sm:mx-0 bg-slate-100 rounded-lg">
                        <ProductImage product={product} fill={false} />
                    </div>
                    <div className="mx-2 grid-rows-none min-h-min rounded-lg p-4">
                        <h1 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.itemname}</h1>
                        <p className="text-blue-800 capitalize">{product.category}</p>
                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                    <span className="text-blue-400 mr-1 mt-1 text-xl font-semibold">₹</span>
                                    <span className="font-bold text-blue-800 text-3xl font-semiboldzz">{product.finalrate}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                {product.discount !== '0' && (
                                    <>
                                        <p className="text-green-500 text-xl font-semibold">Save {product.discount}%</p>
                                        <p className="text-gray-400 text-sm line-through">₹{product.salerate}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-500 py-4">Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.</p>

                        <VariationList product={product} />

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                            <ul className="text-sm text-gray-600">
                                <li>{product.designno}</li>
                                <li>{product.itemcode}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct;