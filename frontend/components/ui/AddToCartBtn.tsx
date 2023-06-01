"use client"
import BagIcon from './BagIcon';
import axios from 'axios';
import { toast } from 'react-toastify';


type Props = {
    product: Product;
};

const addToCart = async (product: Product) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add-product`, {
            user: Math.round(Math.random() * 1000),
            product: product
        });

        if (response.status === 200) {
            console.log('response', response);
            toast.success("Product added to cart");
        }
    } catch (error) {
        toast.error("Something went wrong!");
    }

}

const AddToCartBtn = ({ product }: Props) => {
    return (
        <>
            <button onClick={() => addToCart(product)}>
                <BagIcon />
            </button>
        </>
    )
}

export default AddToCartBtn;