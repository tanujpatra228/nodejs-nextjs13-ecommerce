type CartProduct = {
    _id?: string,
    id?: string,
    itemname: string,
    itemimage: string,
    category: string,
    finalrate: number,
    cartQty: [{
        itemsize?: string;
        qty: number,
        sizeTotal?: number,
    }]
}

type CartItem = {
    _id: string,
    user: string,
    products: CartProduct[],
    __v: number
};

export function calculateTotalCartAmount({ products }: CartItem) {
    let totalAmount = 0;
    if (!products) return 0;

    for (const cartProduct of products) {
        for (const cartQty of cartProduct.cartQty) {
            const { qty, sizeTotal } = cartQty;
            const productAmount = cartProduct.finalrate * qty;
            totalAmount += sizeTotal ? sizeTotal : productAmount;
        }
    }

    return totalAmount;
}

export function calculateTotalQuantity({ products }: CartItem) {
    let totalQuantity = 0;

    for (const cartProduct of products) {
        for (const cartQty of cartProduct.cartQty) {
            const { qty } = cartQty;
            totalQuantity += qty;
        }
    }

    return totalQuantity;
}
