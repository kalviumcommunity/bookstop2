const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  edition: {
    type: String,
    required: true,
    maxlength: 4,
    minlength: 4,
  },
  contact: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  year: {
    type: Number,
    required: true,
    maxlength: 1,
  },
  course: {
    type: String,
    required: true,
  },
  description: String,
  photograph: {
    type: String,
    required: true,
  },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
