const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: [true, 'ID товара обязателен'],
        index: true
    },

    userName: {
        type: String,
        required: [true, 'Имя автора обязательно'],
        trim: true
    },

    rating: {
        type: Number,
        required: [true, 'Оценка обязательна'],
        min: [1, 'Минимальная оценка - 1'],
        max: [5, 'Максимальная оценка - 5']
    },
//dgdgdffава
    text: {
        type: String,
        required: [true, 'Текст отзыва обязателен'],
        trim: true,
        minlength: [3, 'Минимум 3 символа']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;