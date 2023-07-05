'use client'
import { useAppSelector } from "@/utils/hooks";
import EmptyResource from "@/components/ui/EmptyResource";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import CartPageTable from "@/components/CartPageTable";

const CartPage = () => {
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
                                            <Link href="/products" className="font-semibold text-indigo-600 text-sm mt-10 flex items-center gap-2">
                                                <BsArrowLeft />
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>

                                    <div id="summary" className="w-1/4 px-8 py-10">
                                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                                        <div className="flex justify-between mt-10 mb-5">
                                            <span className="font-semibold text-sm uppercase">Total Items: {products.length}</span>
                                            <span className="font-semibold text-sm">${getCartTotal()}</span>
                                        </div>
                                        <div className="py-10">
                                            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                                            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                                        </div>
                                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                                        <div className="border-t mt-8">
                                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                                <span>Total cost</span>
                                                <span>₹{getCartTotal()}</span>
                                            </div>
                                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
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