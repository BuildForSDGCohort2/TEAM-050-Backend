const mongoose = require("mongoose");

const { Schema } = mongoose;

const citizenSchema = new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
phone: Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
placeOfBirth: String,
residentialAddress: String,
  profileImage: String,
  // POB: {
  //   type: Date,
  //   required: true,
  // },
  nationality: {
    type: String
  },
  passport: {
    number: {
      type: Number
    },

    date: {
      type: Date,
    },
    placeOfIssuance: {
      type: String,
    },
  },
  fingerPrint: {
    type: String,
  },
  // periodOfResidence: {
  //   type: Date,
  //   required: true,
  // },
  // age: {
  //   type: String,
  //   required: true,
  // },
  // passportPages: {
  //   dataPage1: {
  //     type: String,
  //     required: true,
  //   },
  //   dataPage2: {
  //     type: String,
  //     required: true,
  //   },
  //   dataPage3: {
  //     type: String,
  //     required: true,
  //   },
  //   VisasPage: {
  //     type: String,
  //     required: true,
  //   },
  //   entryStamp: {
  //     type: String,
  //     required: true,
  //   },
  //   departureStamp: {
  //     type: String,
  //     required: true,
  //   },
  //   fingerPrint: {
  //     type: String,
  //   },
  // },
});

module.exports = mongoose.model("citizen", citizenSchema);
