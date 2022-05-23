const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    contact_number: {
      type: String,
      required: true,
    },
    contact_email: {
      type: String,
      required: true,
    },
    contact_desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("contact", userSchema);
