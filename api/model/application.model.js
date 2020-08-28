const mongoose = require('mongoose')

const { Schema } = mongoose

const applicantSchema = new Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    POB: {
        type: Date,
        required: true
    },
    Nationality: {
        type: String,
        required: true
    },
    passport: {
        number: {
            type: Number,
            require: true
        },

        date: {
            type: Date,
            required: true

        },
        placeOfIssuance: {
            type: String,
            required: true
        }

    },
    fingerPrint: {
        type: String,
    },
    periodOfResidence: {
        type: Date,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    passportPages: {
        dataPage1: {
            type: String,
            required: true
        },
        dataPage2: {
            type: String,
            required: true
        },
        dataPage3: {
            type: String,
            required: true
        },
        VisasPage: {
            type: String,
            required: true
        },
        entryStamp: {
            type: String,
            required: true
        },
        departureStamp: {
            type: String,
            required: true
        },
        fingerPrint: {
            type: ' • A complete set of fingerprints'
        }

    }
})

module.exports = mongoose.model('applicant', applicantSchema)
    

   