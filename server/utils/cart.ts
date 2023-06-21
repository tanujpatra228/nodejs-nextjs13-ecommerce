type CartProduct = {
    _id?: string,
    id?: string,
    itemname: string,
    itemimage: string,
    category: string,
    finalrate: number,
    qty: number,
}

type CartItem = {
    _id: string,
    user: string,
    products: CartProduct[],
    __v: number
};

export const getCartTotal = (cart: CartItem) => {
    let total = 0;
    if (!cart) return 0;

    cart.products.forEach((product) => {
        total += product.finalrate * product.qty;
    });

    return total;
}
