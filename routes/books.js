const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const mongoose = require("mongoose");

/* GET books listing. */
const tryWrapper = asyncMiddleware => {
  return async (req, res, next) => {
    try {
      await asyncMiddleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.get(
  "/",
  tryWrapper(async (req, res, next) => {
    const books = await Book.find().populate("author");
    res.json(books);
  })
);

router.get("/:id", (req, res, next) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post(
  "/",
  tryWrapper(async (req, res, next) => {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });

    await newBook.save();

    res.status(201).json({ message: `created a new book successfully` });
  })
);

router.put(
  "/:id",
  tryWrapper(async (req, res, next) => {
    res.json({ message: `update book with id ${req.params.id}` });
  })
);

router.delete("/:id", async (req, res, next) => {
  try {
    res.json({ message: `delete book with id ${req.params.id}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
