"use client"
import BagIcon from './BagIcon';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slice/cart';

type Props = {
    product: Product;
};

const handleAddToCart = async (cartData: CartData, dispatch: any) => {
    const response = await dispatch(addToCart(cartData));

    if (response?.payload?.statusText === "OK") {
        toast.success("Product added to cart");
    }
}

const AddToCartBtn = ({ product }: Props) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const productData = {
        id: product._id,
        itemname: product.itemname,
        finalrate: product.finalrate,
        qty: 1,
    };
    const router = useRouter();
    return (
        <>
            <button onClick={() => session ? handleAddToCart({ productData, session }, dispatch) : router.push('/login')}>
                <BagIcon />
            </button>
        </>
    )
}

export default AddToCartBtn;