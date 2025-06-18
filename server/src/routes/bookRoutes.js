import express from "express";
import { prisma } from "../db/prisma.js";

const bookRouter = express.Router();

bookRouter.post('/search', async (req, res) => {
  const { title } = req.body;
  console.log('search request:', title);

  try {
    const books = await prisma.book.findMany({
      take: 100,
      skip: 0,
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
      },
    });

    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Failed to search books" });
  }
});

bookRouter.post('/add', async (req, res) => {
  const { title, author, isbn } = req.body;
  console.log('Book Added: ', title);

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Invalid input", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

export default bookRouter;