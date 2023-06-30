'use client'

import { useState } from "react";
import AddToCartBtn from "./ui/AddToCartBtn";

type Props = {
    product: Product;
}

const VariationList = ({ product }: Props) => {
    const [currentVariation, setCurrentVariation] = useState<string>(product?.itemsize[0])
    return (
        <>
            <div className='flex justify-start items-center gap-2 py-4'>
                {
                    // Size
                    product?.itemsize.length !== 0 &&
                    (
                        <>
                            <p className="text-gray-500">Size:</p>
                            {
                                product?.itemsize.map((element: string) => (
                                    <button
                                        key={element}
                                        onClick={() => setCurrentVariation(element)}
                                        className={`px-5 py-2 transition duration-300  ${element === currentVariation ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'} hover:shadow-lg rounded-full`}
                                    >
                                        {element}
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

            <div className="flex items-center py-4">
                <AddToCartBtn product={product} showQty={true} itemsize={currentVariation} />
            </div>
        </>
    )
}

export default VariationList