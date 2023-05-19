import express, { Request, Response } from 'express';
const router = express.Router();
const Product = require('../models/product');
const { generateMongoFilterfromQueryString } = require('../utils/handleQueryString');

// Get all products
router.get('/', async (req: Request, res: Response) => {
    const filters = generateMongoFilterfromQueryString(req.query);

    Product.find(filters).then((data: any) => {
        res.json({ status: 200, count: data.length, products: data });
    }).catch((err: Error) => {
        res.json({ status: 500, message: err.message });
    });
});


// Get product by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.json({ status: 400, message: 'Bad request' });

    Product.findById(id).then((data: any) => {
        res.json({ status: 200, product: data });
    }).catch((err: Error) => {
        res.json({ status: 500, message: err.message });
    })
});




module.exports = router;