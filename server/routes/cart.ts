import express, { Request, Response } from 'express';
const router = express.Router();
const Product = require('../models/product');

router.post('/add-product', async (req: Request, res: Response) => {
    console.log('req', req.body);

    res.status(200).send({ message: 'Added to cart' });
});

module.exports = router;