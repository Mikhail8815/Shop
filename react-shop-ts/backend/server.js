const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Подключено к MongoDB Atlas'))
    .catch(err => {
        console.error('❌ Ошибка подключения к MongoDB:', err);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.json({
        message: '🚀 API отзывов работает',
        endpoints: {
            getReviews: 'GET /api/products/:productId/reviews',
            addReview: 'POST /api/reviews',
            deleteReview: 'DELETE /api/reviews/:id'
        }
    });
});

app.use('/api', reviewRoutes);

app.use('/*splat', (req, res) => {
    res.status(404).json({ message: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error('Необработанная ошибка:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});