'use client'
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';

const CartBtn = () => {
    const { cart } = useSelector(state => state);
    const totalQty = cart?.data.totalQty;

    return (
        <>
            <button className='rounded-full px-2 py-1 flex justify-center items-center relative text-xl'>
                <FiShoppingCart />
                {!isNaN(totalQty) && <span className='bg-red-700 rounded-full min-w-[20px] min-h-[20px] px-1 absolute top-1 right-0 text-xs flex justify-center items-center'>{totalQty}</span>}
            </button>
        </>
    )
}

export default CartBtn;