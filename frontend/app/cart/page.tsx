'use client'
import { useState } from "react";
import { useAppSelector } from "@/utils/hooks";
import EmptyResource from "@/components/ui/EmptyResource";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import CartPageTable from "@/components/CartPageTable";
import { Switch } from "@headlessui/react";
import { FcFlashOn } from "react-icons/fc"

const SHIPPING_CHARGES = 50;

const CartPage = () => {
    const [isFastShipping, setIsFastShipping] = useState(false);
    const { cart } = useAppSelector((state: any) => state);
    const products = cart.data.products || [];

    const getCartTotal = () => {
        let totalAmount = 0;
        if (!products) return 0;

        for (const cartProduct of products) {
            for (const cartQty of cartProduct.cartQty) {
                const { qty, sizeTotal } = cartQty;
                const productAmount = cartProduct.finalrate * qty;
                totalAmount += sizeTotal | productAmount;
            }
        }

        return totalAmount;
    }
    const calcShipping = (amount = 0) => {
        return isFastShipping ? amount + SHIPPING_CHARGES : amount;
    }
    return (
        <>
            <section className="mt-32 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto mt-10">
                    <div className="flex shadow-md my-10 divide-x">
                        {
                            !products?.length ? (
                                <div className="w-1/4 bg-white px-10 py-10 m-auto flex flex-col justify-center items-center gap-4">
                                    <EmptyResource width={300} text="No Product in cart" />
                                    <div className="flex justify-between mt-10 mb-5">
                                        <Link href="/products" className="font-semibold text-indigo-600 text-sm mt-10 flex items-center gap-2">
                                            <BsArrowLeft />
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-3/4 bg-white px-10 py-10">
                                        <div className="flex justify-between border-b pb-8">
                                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                                            <h2 className="font-semibold text-2xl">{products.length && products.length > 1 ? `${products.length} Items` : `${products.length} Item`}</h2>
                                        </div>

                                        <CartPageTable cartId={cart.data._id} products={products} />

                                        <div className="flex justify-between mt-10 mb-5">
                                            <Link href="/products" className="font-semibold text-blue-800 text-sm mt-10 flex items-center gap-2">
                                                <BsArrowLeft />
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>

                                    <div id="summary" className="w-1/4 px-8 py-10">
                                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                                        <div className="flex justify-between mt-10 mb-5">
                                            <span className="font-semibold text-sm capitalize">Total Items: {products.length}</span>
                                            <span className="font-semibold text-sm">₹{getCartTotal()}</span>
                                        </div>
                                        <div className="flex justify-between mb-5">
                                            <div className="font-semibold text-sm capitalize flex items-center gap-4">
                                                <div className="w-28 h-[18px] overflow-hidden">
                                                    <div className={`transition delay-100 ${isFastShipping ? '-translate-y-4' : 'translate-y-0'}`}>
                                                        <p className={`transition delay-100 ${isFastShipping ? 'text-white' : 'text-gray-800'} leading-4`}>Regular Shipping</p>
                                                        <p className={`transition delay-100 ${!isFastShipping ? 'text-white' : 'text-gray-800'} leading-4 flex items-center`}>Fast Shipping <FcFlashOn className="text-lg" /></p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={isFastShipping}
                                                        onChange={setIsFastShipping}
                                                        className={`${isFastShipping ? 'bg-blue-800' : 'bg-gray-200'
                                                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                                                    >
                                                        <span className="sr-only">Enable Fast Shipping</span>
                                                        <span
                                                            className={`${isFastShipping ? 'translate-x-6' : 'translate-x-1'
                                                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                        />
                                                    </Switch>
                                                </div>
                                            </div>
                                            <span className="font-semibold text-sm">₹{isFastShipping ? `${getCartTotal()} + ₹${SHIPPING_CHARGES}` : getCartTotal()}</span>
                                        </div>

                                        <div className="border-t mt-8">
                                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                                <span className="capitalize">Total cost</span>
                                                <span>₹{(getCartTotal() + calcShipping(getCartTotal()))}</span>
                                            </div>
                                            <button className="bg-blue-800 font-semibold hover:bg-blue-900 py-3 text-sm text-white uppercase w-full">Checkout</button>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default CartPage;