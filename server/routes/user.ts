import express, { Request, Response } from 'express';
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req: Request, res: Response) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email: email });
        res.status(200).json({ success: true, user });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.patch('/update-profile', async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            const newUser = new User({
                name: name,
                email: email,
                phone: phone,
            });
            await newUser.save();
        } else {
            user.name = name;
            user.email = email;
            user.phone = phone;
            await user.save();
        }
        res.status(201).json({ success: true, message: 'Profile Updated Successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;