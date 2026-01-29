import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Task route is working!' });
});

router.post('/', (req, res) => {
    res.status(200).json({ message: 'Task route is working!' });
});

router.put('/', (req, res) => {
    res.status(200).json({ message: 'Task route is working!' });
});

router.delete('/', (req, res) => {
    res.status(200).json({ message: 'Task route is working!' });
});


export default router;