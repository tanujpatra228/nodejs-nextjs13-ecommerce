'use client'

import Link from "next/link";
import ProductImage from "./ui/ProductImage";
import { CiCircleRemove } from 'react-icons/ci'
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/slice/cart";

type Props = {
    cartId: string;
    product: CartItem;
};

const CartItem = ({ cartId, product }: Props) => {
    const dispatch = useDispatch();
    const { id, itemname, finalrate, qty } = product;
    return (
        <>
            <div className="flex items-center mt-6 py-5 transition duration-150 ease-in-out bg-white rounded-md hover:bg-gray-100">
                <div className="flex gap-2">
                    <div className="w-20">
                        <ProductImage product={product} width={50} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-sm"><Link href={`products/${id}`}>{itemname}</Link></span>
                        <span className="text-sm">{qty} x ${finalrate}</span>
                        <button onClick={() => dispatch(removeFromCart({ cartId, id }))}>
                            <CiCircleRemove className="text-xl text-red-500" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem;