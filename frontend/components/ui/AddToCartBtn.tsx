"use client"
import React from 'react';
import BagIcon from './BagIcon';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { addToCart } from '@/redux/slice/cartMethods';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch } from '@/utils/hooks';

type Props = {
    product: Product;
    showQty?: boolean;
    itemsize?: string;
};

const handleAddToCart = async (cartData: CartData, dispatch: any) => {
    const response = await dispatch(addToCart(cartData));

    if (response?.payload?.status === "success") {
        toast.success("Product added to cart");
    }
}

const AddToCartBtn = ({ product, showQty, itemsize }: Props) => {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const [qty, setQty] = useState(1);
    const productData: CartItem = {
        id: product._id,
        itemname: product.itemname,
        itemimage: product.itemimage,
        category: product.category,
        finalrate: product.finalrate,
        cartQty: [{
            itemsize: itemsize || product?.itemsize[0],
            qty: qty,
        }],
    };
    const router = useRouter();
    return (
        <>
            {
                showQty ? (
                    <>
                        <div className='flex justify-between items-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <button onClick={() => setQty(qty - 1)}><AiOutlineMinus /></button>
                                <input type="text" name="qty" value={qty} className='w-10 text-center' />
                                <button onClick={() => setQty(qty + 1)}><AiOutlinePlus /></button>
                            </div>
                            <button
                                onClick={() => session ? handleAddToCart({ productData, session }, dispatch) : router.push('/login')}
                                className='flex justify-between items-center gap-4 px-5 py-3 rounded-full transition delay-100 bg-blue-500 text-white hover:bg-blue-600'
                            >
                                <BagIcon /> {' Add to Cart'}
                            </button>
                        </div>
                    </>
                ) : (
                    <button onClick={() => session ? handleAddToCart({ productData, session }, dispatch) : router.push('/login')}>
                        <BagIcon />
                    </button >
                )
            }
        </>
    )
}

export default AddToCartBtn;