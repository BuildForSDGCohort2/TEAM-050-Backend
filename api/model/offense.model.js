const mongoose = require("mongoose");

const { Schema } = mongoose;

const offense = new Schema(
  {
    citizen: {
      type: Schema.Types.ObjectId,
      ref: 'citizen',
      required: true
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("offenses", offense);
