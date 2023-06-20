'use client'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import CartSidebar from '../CartSidebar';

const CartBtn = () => {
    const { cart } = useSelector(state => state);
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const ping = useRef<HTMLSpanElement>();
    const totalQty = cart?.data.totalQty;
    useEffect(() => {
        ping?.current?.classList?.add('animate-ping-once');
        const timeout = setTimeout(() => {
            ping?.current?.classList?.remove('animate-ping-once');
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    });

    return (
        <>
            <button className='rounded-full px-2 py-1 flex justify-center items-center relative text-xl' onClick={() => setCartIsOpen(!cartIsOpen)}>
                <FiShoppingCart />
                {!isNaN(totalQty) && totalQty > 0 && (
                    <>
                        <span ref={ping} className={`bg-red-700 rounded-full min-w-[20px] min-h-[20px] px-1 absolute top-1 right-0 text-xs flex justify-center items-center`} />
                        <span className='bg-red-700 rounded-full min-w-[20px] min-h-[20px] px-1 absolute top-1 right-0 text-xs flex justify-center items-center'>{totalQty}</span>
                    </>
                )}
            </button>
            {cartIsOpen && <CartSidebar isOpen={cartIsOpen} setIsOpen={setCartIsOpen} />}
        </>
    )
}

export default CartBtn;