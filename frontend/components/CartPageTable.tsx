'use client'
import CartTableRow from "./CartTableRow";
import EmptyResource from "./ui/EmptyResource";

type Props = {
    cartId: string;
    products: CartItem[];
}

const CartPageTable = ({ cartId, products }: Props) => {
    return (
        <>
            {
                products?.length ? (
                    <>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>

                        <div className="max-h-96 overflow-hidden overflow-y-auto will-change-scroll space-y-2">
                            {products.length > 0 && products.map((product: CartItem) => <CartTableRow key={product.id} cartId={cartId} product={product} />)}
                        </div>
                    </>
                ) : (
                    <div className="w-1/4 bg-white px-10 py-10 m-auto flex flex-col justify-center items-center gap-4">
                        <EmptyResource width={300} text="No Product in cart" />
                    </div>
                )}
        </>
    )
}

export default CartPageTable;