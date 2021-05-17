const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: ['City is required field']
    },
    population: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('city', citySchema);