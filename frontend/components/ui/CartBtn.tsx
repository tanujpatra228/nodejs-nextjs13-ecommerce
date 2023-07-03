'use client'
import { useState, useEffect, useRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import CartSidebar from '../CartSidebar';
import { useSession } from 'next-auth/react';
import { getCart } from '@/redux/slice/cartMethods';
import { clearCart } from '@/redux/slice/cart';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

const CartBtn = () => {
    const { data: session } = useSession();
    const { cart } = useAppSelector((state: any) => state);
    const dispatch = useAppDispatch();
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const ping = useRef<HTMLSpanElement>(null);
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

    useEffect(() => {
        session ? dispatch(getCart(session)) : dispatch(clearCart());
    }, [session]);

    return (
        <>
            <button className='rounded-full px-2 py-1 flex justify-center items-center relative text-xl' onClick={() => setCartIsOpen(true)}>
                <FiShoppingCart />
                {session && !isNaN(totalQty) && totalQty > 0 && (
                    <>
                        <span ref={ping} className={`bg-red-700 rounded-full min-w-[20px] min-h-[20px] px-1 absolute top-1 right-0 text-xs flex justify-center items-center`} />
                        <span className='bg-red-700 rounded-full min-w-[20px] min-h-[20px] px-1 absolute top-1 right-0 text-xs flex justify-center items-center'>{totalQty}</span>
                    </>
                )}
            </button>
            <CartSidebar isOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />
        </>
    )
}

export default CartBtn;