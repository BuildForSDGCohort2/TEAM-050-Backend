const mongoose = require('mongoose')

const { Schema } = mongoose

const officer = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            require: true
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: String,

},{
    timestamps: true
})

module.exports = mongoose.model('officers', officer)