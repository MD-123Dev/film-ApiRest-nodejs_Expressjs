const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    name: {
        type: String,
        required: true
        
    },
    description: {
        type: String,
        required: true
        
    },
    rate: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Film', filmSchema);