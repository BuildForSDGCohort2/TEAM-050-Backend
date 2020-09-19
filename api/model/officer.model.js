const mongoose = require("mongoose");

const { Schema } = mongoose;

const officer = new Schema(
  {
    // _id: String,
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        require: true,
      },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    addOffense: [
      {
        type: Schema.Types.ObjectId,
        ref: "offenses",
      },
    ],
    gender: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("officers", officer);
