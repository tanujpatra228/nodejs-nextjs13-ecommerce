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
    const dispatch = useDispatch();

    const incrementQty = () => {
        dispatch(updateQty({ cartId: cartId, id: product.id, qty: product.qty + 1 }));
    }
    const decrementQty = () => {
        const newQty = product.qty - 1;
        if (!product) return;

        if (newQty) {
            dispatch(updateQty({ cartId: cartId, id: product.id, qty: newQty }));
        } else {
            dispatch(removeFromCart({ cartId: cartId, id: product.id }));
        }
    }

    return (
        <>
            {
                <div className="flex items-center max-h-32 hover:bg-gray-100 -mx-8 px-6 py-5 rounded-lg overflow-hidden" key={product._id}>
                    <div className="flex w-2/5">
                        <div className="w-20">
                            <ProductImage product={product} width={50} />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                            <span className="font-bold text-sm"><Link href={`products/${product.id}`}>{product.itemname}</Link></span>
                            <span className="text-xs capitalize">{product.category}</span>
                            <button onClick={() => dispatch(removeFromCart({ cartId: cartId, id: product.id }))}>
                                <CiCircleRemove className="text-xl text-red-500" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                        <button onClick={decrementQty}>
                            <AiOutlineMinus />
                        </button>

                        <input className="mx-2 border text-center w-8" type="text" value={product?.qty} />

                        <button onClick={incrementQty}>
                            <AiOutlinePlus />
                        </button>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">${product.finalrate}</span>
                    <span className="text-center w-1/5 font-semibold text-sm">${product.finalrate * product.qty}</span>
                </div>
            }
        </>
    )
}

export default CartTableRow;