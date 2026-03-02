const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.get('/products/:productId/reviews', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);

        const reviews = await Review.find({ productId })
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        console.error('Ошибка получения отзывов:', error);
        res.status(500).json({
            message: 'Ошибка сервера при получении отзывов'
        });
    }
});

router.post('/reviews', async (req, res) => {
    try {
        const { productId, userName, rating, text } = req.body;

        if (!productId || !userName || !rating || !text) {
            return res.status(400).json({
                message: 'Все поля обязательны: productId, userName, rating, text'
            });
        }

        const newReview = new Review({
            productId: parseInt(productId),
            userName,
            rating: parseInt(rating),
            text
        });

        const savedReview = await newReview.save();

        res.status(201).json(savedReview);

    } catch (error) {
        console.error('Ошибка создания отзыва:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: messages.join(', ') });
        }

        res.status(500).json({
            message: 'Ошибка сервера при создании отзыва'
        });
    }
});

// @route   DELETE /api/reviews/:id
// @desc    Удалить отзыв (пригодится для админки)
router.delete('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Отзыв не найден' });
        }

        res.json({ message: 'Отзыв удален', review });
    } catch (error) {
        console.error('Ошибка удаления отзыва:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;