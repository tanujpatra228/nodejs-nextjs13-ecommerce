import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        throw new Error('Sentry Error send to Slack');
    } catch (err: any) {
        console.log('error', err.message);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;