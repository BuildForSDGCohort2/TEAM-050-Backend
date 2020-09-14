const mongoose = require('mongoose')

const { Schema } = mongoose

const officer = new Schema({
    name: {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            require: true
        }
    },
    email: {
        type: String,
        required: true
    },
    gender: String,

})