'use client'
import { useDispatch } from "react-redux";
import ProductImage from "./ui/ProductImage";
import { CiCircleRemove } from "react-icons/ci";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { removeFromCart, updateQty } from '@/redux/slice/cartMethods';
import Link from "next/link";

type Props = {
    cartId: string;
    product: CartItem;
}

const CartTableRow = ({ cartId, product }: Props) => {
    const { _id, id, itemname, finalrate, category, cartQty } = product;
    const dispatch = useDispatch();

    // TODO: Fix the increment and decrement methods
    const incrementQty = (size: string) => {
        if (!product) return;
        const sizeToUpdate = product.cartQty.findIndex((p: { itemsize?: string }) => p.itemsize === size);
        const newQty = product.cartQty[sizeToUpdate].qty + 1;
        dispatch(updateQty({ cartId: cartId, id: product.id, qty: newQty, size: size }));
    }
    const decrementQty = (size: string) => {
        if (!product) return;

        const sizeToUpdate = product.cartQty.findIndex((p: { itemsize?: string }) => p.itemsize === size);
        const newQty = product.cartQty[sizeToUpdate].qty - 1;

        if (newQty) {
            dispatch(updateQty({ cartId: cartId, id: product.id, qty: newQty, size: size }));
        } else {
            dispatch(removeFromCart({ cartId: cartId, id: product.id, size: size }));
        }
    }

    return (
        <>
            {
                cartQty.length > 1 ? (
                    cartQty.map((size: { itemsize?: string, qty: number }) => (
                        <div className="flex items-center max-h-32 hover:bg-gray-100 -mx-8 px-6 py-5 rounded-lg overflow-hidden" key={_id}>
                            <div className="flex w-2/5">
                                <div className="w-20">
                                    <ProductImage product={product} width={50} />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    <span className="font-bold text-sm"><Link href={`products/${id}`}>{itemname}</Link></span>
                                    <span className="text-xs capitalize">{category}</span>
                                    <span className="text-xs capitalize">Size: {size.itemsize}</span>
                                    <button onClick={() => dispatch(removeFromCart({ cartId: cartId, id: id, size: size.itemsize }))}>
                                        <CiCircleRemove className="text-xl text-red-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/5">
                                <button onClick={() => decrementQty(size.itemsize || '')}>
                                    <AiOutlineMinus />
                                </button>

                                <input className="mx-2 text-center w-8" type="text" value={size.qty} readOnly />

                                <button onClick={() => incrementQty(size.itemsize || '')}>
                                    <AiOutlinePlus />
                                </button>
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">${finalrate}</span>
                            <span className="text-center w-1/5 font-semibold text-sm">${finalrate * size.qty}</span>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center max-h-32 hover:bg-gray-100 -mx-8 px-6 py-5 rounded-lg overflow-hidden" key={_id}>
                        <div className="flex w-2/5">
                            <div className="w-20">
                                <ProductImage product={product} width={50} />
                            </div>
                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                <span className="font-bold text-sm"><Link href={`products/${id}`}>{itemname}</Link></span>
                                <span className="text-xs capitalize">{category}</span>
                                <span className="text-xs capitalize">Size: {cartQty[0].itemsize}</span>
                                <button onClick={() => dispatch(removeFromCart({ cartId: cartId, id: id }))}>
                                    <CiCircleRemove className="text-xl text-red-500" />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center w-1/5">
                            <button onClick={() => decrementQty(cartQty[0].itemsize || '')}>
                                <AiOutlineMinus />
                            </button>

                            <input className="mx-2 border text-center w-8" type="text" value={cartQty[0].qty} />

                            <button onClick={() => incrementQty(cartQty[0].itemsize || '')}>
                                <AiOutlinePlus />
                            </button>
                        </div>
                        <span className="text-center w-1/5 font-semibold text-sm">${finalrate}</span>
                        <span className="text-center w-1/5 font-semibold text-sm">${finalrate * cartQty[0].qty}</span>
                    </div>
                )
            }
        </>
    )
}

export default CartTableRow;