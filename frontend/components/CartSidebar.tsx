'use client'
import { Dialog } from '@headlessui/react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import EmptyResource from './ui/EmptyResource';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
    isOpen: boolean;
    setCartIsOpen: (p: boolean) => void;
};

const CartSidebar = ({ isOpen, setCartIsOpen }: Props) => {
    const { cart } = useSelector((state: any) => state);
    const { data: session } = useSession();
    const route = useRouter();
    const totalQty = cart?.data.totalQty;
    const cartTotal = cart?.data.cartTotal;
    const cartItem = cart?.data.products || [];

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setCartIsOpen(false)}
                className={`absolute inset-0 z-20 p-8 h-screen`}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <Dialog.Panel className="fixed right-0 top-0 flex flex-col h-full w-96 bg-white pt-6">
                    <Dialog.Title className="font-semibold text-2xl px-6">Shopping Cart</Dialog.Title>
                    {
                        session ? (
                            <>
                                <h2 className="font-semibold text-sm px-6 pb-3">{totalQty} Items</h2>
                                <div className='h-full overflow-y-auto will-change-scroll flex flex-col px-6'>
                                    {
                                        cartItem.length > 0 ? (
                                            cartItem.map((product: CartItem) => <CartItem key={product.id} cartId={cart.data._id} product={product} />)
                                        ) : (
                                            <div className='h-full flex justify-center items-center'>
                                                <EmptyResource width={200} />
                                            </div>
                                        )
                                    }
                                </div>
                                {totalQty > 0 ? (
                                    <div className='relative pt-6'>
                                        <div className='flex flex-col gap-5 px-6 py-2'>
                                            <span className='text-xl font-bold'>Total: ₹{cartTotal}</span>
                                            <button
                                                className='p-3 border border-blue-800 transition delay-75 hover:bg-blue-800 hover:text-white'
                                                onClick={() => {
                                                    route.replace('/cart');
                                                    setCartIsOpen(false);
                                                }}
                                            >View Cart</button>
                                            <button
                                                className='p-3 border border-blue-800 text-white transition delay-75 bg-blue-800 hover:bg-blue-900'
                                                onClick={() => {
                                                    route.replace('/checkout');
                                                    setCartIsOpen(false);
                                                }}
                                            >Checkout</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='relative pt-6'>
                                        <div className='flex flex-col gap-5 px-6 py-2'>
                                            <button
                                                className='p-3 border border-blue-800 text-white transition delay-75 bg-blue-800 hover:bg-blue-900'
                                                onClick={() => {
                                                    setCartIsOpen(false);
                                                    route.replace('/products');
                                                }}
                                            >
                                                Continue Shopping
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className='h-40 p-6'>
                                <p><Link href='/login' className='underline'>Login</Link> to add products in to cart.</p>
                            </div>
                        )
                    }
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default CartSidebar;