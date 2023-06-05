"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
    product: Product;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
};

const ProductImage = ({ product, fill, width, height, className }: ProductImageProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <img
                src={`https://www.m4mformen.com/${product.itemimage}`}
                // fill={fill}
                alt={product.itemname}
                width={width || 500}
                height={height || 500}
                className={`${className ? className : 'h-full m-auto object-contain'} duration-300 ease-in-out group-hover:opacity-75 ${loading
                    ? 'opacity-30 blur-lg grayscale'
                    : 'blur-0 grayscale-0'
                    }`}
            // onLoadingComplete={() => setLoading(false)}
            // onError={() => console.log(`${product.itemimage} failed to load`)}
            />
        </>
    )
}

export default ProductImage;