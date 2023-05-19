// "use client"

import Link from 'next/link';
import BagIcon from './ui/BagIcon';
import ProductImage from './ui/ProductImage';

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    const { _id, itemname, itemimage, salerate, finalrate } = product;

    return (
        <>
            <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Link href={`/products/${_id}`}>
                    <ProductImage product={product} className="h-80 object-cover rounded-t-xl" width={350} height={320} />
                    <div className="px-4 py-3">
                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                        <p className="text-lg font-bold text-black truncate block capitalize">{itemname}</p>
                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">${finalrate}</p>
                            {salerate !== 0 && (<del>
                                <p className="text-sm text-gray-600 cursor-auto ml-2">${salerate}</p>
                            </del>)}
                            <div className="ml-auto">
                                <BagIcon />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

        </>
    )
}

export default ProductCard
