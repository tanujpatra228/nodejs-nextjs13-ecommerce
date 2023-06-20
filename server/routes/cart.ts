import express, { Request, Response } from 'express';
const router = express.Router();
const Cart = require('../models/cart');

router.post('/add-product', async (req: Request, res: Response) => {
    const { product, user } = req.body;
    const cart = await Cart.findOne({ user: user });

    if (!cart) {
        const newCart = new Cart({
            user: user,
            products: [product]
        });
        await newCart.save();
    } else {
        const productIndex = cart.products.findIndex((p: any) => p.id === product.id);
        if (productIndex !== -1) {
            cart.products[productIndex].qty += product.qty;
            cart.products[productIndex].finalrate = product.finalrate;
            cart.markModified('products');
        } else {
            cart.products.push(product);
        }
        await cart.save();
    }
    const totalQty = cart.products.reduce((acc: number, product: any) => acc + product.qty, 0);
    return res.status(200).send({ status: 'success', _id: cart._id, totalQty: totalQty, products: cart?.products || [] });
});

router.patch('/remove-product', async (req: Request, res: Response) => {
    const { cartId, id } = req.body;
    try {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex((product: any) => product.id === id);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }

        cart.products.splice(productIndex, 1);

        await cart.save();

        const totalQty = cart.products.reduce((acc: number, product: any) => acc + product.qty, 0);
        return res.status(200).send({ status: 'success', _id: cart._id, totalQty: totalQty, products: cart?.products || [] });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;