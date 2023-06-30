import express, { Request, Response } from 'express';
import { calculateTotalCartAmount, calculateTotalQuantity } from '../utils/cart';
const router = express.Router();
const Cart = require('../models/cart');
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
    }]
}

router.get('/', async (req: Request, res: Response) => {
    const { user } = req.query;
    const cart = await Cart.findOne({ user: user });

    try {
        if (!cart) {
            return res.status(200).send({ status: 'success', _id: '', totalQty: 0, products: [], cartTotal: 0 });
        }
        // const cartTotal = getCartTotal(cart);
        const cartTotal = calculateTotalCartAmount(cart);
        const totalQty = calculateTotalQuantity(cart);
        return res.status(200).send({ status: 'success', _id: cart._id, totalQty: totalQty, products: cart?.products || [], cartTotal: cartTotal });
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ error: error.message });
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add-product', async (req: Request, res: Response) => {
    const { product, user } = req.body;
    const cart = await Cart.findOne({ user: user });
    let currentCart = null;

    try {
        if (!cart) {
            const newCart = new Cart({
                user: user,
                products: [product]
            });
            await newCart.save();
            currentCart = newCart;
        } else {
            const productIndex = cart.products.findIndex((p: CartProduct) => p.id === product.id);
            if (productIndex !== -1) {
                const productToUpdate = cart.products[productIndex];

                if (productToUpdate) {
                    const { itemsize, qty } = product.cartQty[0];
                    const productCartQty = productToUpdate.cartQty.findIndex((p: { itemsize: string }) => p.itemsize === itemsize);

                    if (productCartQty !== -1) {
                        cart.products[productIndex].cartQty[productCartQty].qty += qty;
                    } else {
                        cart.products[productIndex].cartQty.push({ itemsize, qty });
                    }

                    cart.products[productIndex].finalrate = product.finalrate;
                    cart.markModified('products');
                }
            } else {
                cart.products.push(product);
            }
            await cart.save();
            currentCart = cart;
        }
        const cartTotal = calculateTotalCartAmount(currentCart);
        const totalQty = calculateTotalQuantity(currentCart);
        return res.status(200).send({ status: 'success', _id: currentCart._id, totalQty: totalQty, products: currentCart?.products || [], cartTotal: cartTotal });
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ error: error.message });
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/remove-product', async (req: Request, res: Response) => {
    const { cartId, id, size } = req.body;
    try {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex((product: CartProduct) => product.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }

        if (cart.products[productIndex].cartQty.length > 1) {
            const sizeToRemove = cart.products[productIndex].cartQty.findIndex((p: { itemsize: string }) => p.itemsize === size);
            cart.products[productIndex].cartQty.splice(sizeToRemove, 1);
        } else {
            cart.products.splice(productIndex, 1);
        }
        cart.markModified('products');
        await cart.save();

        if (cart.products?.length < 1) {
            await Cart.findByIdAndDelete(cartId);
            return res.status(200).send({ status: 'success', _id: cart._id, totalQty: 0, products: [], cartTotal: 0 });
        }

        const cartTotal = calculateTotalCartAmount(cart);
        const totalQty = calculateTotalQuantity(cart);
        return res.status(200).send({ status: 'success', _id: cart._id, totalQty: totalQty, products: cart?.products || [], cartTotal: cartTotal });
    } catch (error: any) {
        if (error instanceof Error) return res.status(500).json({ error: error.message });
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/update-qty', async (req: Request, res: Response) => {
    const { cartId, id, qty } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex((product: CartProduct) => product.id === id);
        cart.products[productIndex].cartQty.qty = qty;
        cart.markModified('products');
        await cart.save();

        const cartTotal = calculateTotalCartAmount(cart);
        const totalQty = calculateTotalQuantity(cart);
        return res.status(200).send({ status: 'success', _id: cart._id, totalQty: totalQty, products: cart?.products || [], cartTotal: cartTotal });

    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ error: error.message });
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;