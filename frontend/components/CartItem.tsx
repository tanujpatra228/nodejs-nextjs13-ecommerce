'use client'

import Link from "next/link";
import ProductImage from "./ui/ProductImage";
import { CiCircleRemove } from 'react-icons/ci'
import { removeFromCart } from "@/redux/slice/cartMethods";
import { useAppDispatch } from "@/utils/hooks";

type Props = {
    cartId: string;
    product: CartItem;
};

const CartItem = ({ cartId, product }: Props) => {
    const dispatch = useAppDispatch();
    const { id, itemname, finalrate, cartQty } = product;
    const handleRemoveFromCart = ({ cartId, id, size }: { cartId: string, id: string | undefined, size?: string }) => {
        if (!id || !size) return;
        dispatch(removeFromCart({ cartId, id, size: size }));
    }
    return (
        <>
            {
                cartQty.length > 1 ? (
                    cartQty.map((size: { itemsize?: string, qty: number }) => (
                        <>
                            <div className="max-h-32 flex items-center mt-6 py-5 transition duration-150 ease-in-out bg-white rounded-md hover:bg-gray-100">
                                <div className="flex gap-2">
                                    <div className="w-20">
                                        <ProductImage product={product} width={50} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-sm"><Link href={`products/${id}`}>{itemname}</Link></span>
                                        <span className="text-sm">Size: {size.itemsize}</span>
                                        <span className="text-sm">{size.qty} x ₹${finalrate}</span>
                                        <button onClick={() => handleRemoveFromCart({ cartId, id, size: size.itemsize })}>
                                            <CiCircleRemove className="text-xl text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                ) : (
                    <>
                        <div className="max-h-32 flex items-center mt-6 py-5 transition duration-150 ease-in-out bg-white rounded-md hover:bg-gray-100">
                            <div className="flex gap-3">
                                <div className="w-20">
                                    <ProductImage product={product} width={50} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-sm"><Link href={`products/${id}`}>{itemname}</Link></span>
                                    <span className="text-sm">Size: {cartQty[0].itemsize}</span>
                                    <span className="text-sm">{cartQty[0].qty} x ₹${finalrate}</span>
                                    <button onClick={() => handleRemoveFromCart({ cartId, id })}>
                                        <CiCircleRemove className="text-xl text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CartItem;