const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      allowNull: false,
    },
    type: {
      type: String,
      allowNull: false,
    },
    freeTime: {
      type: Array,
      allowNull: false,
      required: [true, "Та сул цагаа оруулна уу"],
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
module.exports = mongoose.model("categoryshema", categorySchema);
