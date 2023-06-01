import express, { Request, Response } from 'express';
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req: Request, res: Response) => {
    User.findOne({ email: req.body.email }, (err: any, user: any) => { })
});

module.exports = router;