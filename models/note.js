const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
