import express from "express";
import { prisma } from "../db/prisma.js";

const bookRouter = express.Router();

bookRouter.post('/search', async (req, res) => {
  const { title = "", take = 50, skip = 0 } = req.body;

  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: title, mode: 'insensitive' } },
          { author: { contains: title, mode: 'insensitive' } },
          { isbn: { contains: title, mode: 'insensitive' } },
        ],
      },
      take,
      skip,
      orderBy: {
        title: 'asc',
      },
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        coverImage: true,
        available: true,
      },
    });

    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Failed to search books" });
  }
});

bookRouter.post('/add', async (req, res) => {
  const { title, author, isbn, coverImage } = req.body;
  console.log('Book Added:', title);

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        coverImage: coverImage || null,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Invalid input", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// CHECKOUT A BOOK
bookRouter.post('/checkout', async (req, res) => {
  const { bookId, isbn, username } = req.body;

  if (!username || (!bookId && !isbn)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let book;

    if (bookId) {
      book = await prisma.book.findUnique({ where: { id: parseInt(bookId) } });
    } else if (isbn) {
      book = await prisma.book.findUnique({ where: { isbn } });
    }

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (!book.available) {
      return res.status(400).json({ error: "Book is already checked out" });
    }

    const checkout = await prisma.checkout.create({
      data: {
        bookId: book.id,
        userId: user.id,
      },
    });

    await prisma.book.update({
      where: { id: book.id },
      data: { available: false },
    });

    res.status(201).json({ message: "Checkout successful", bookTitle: book.title });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to check out book" });
  }
});

// SHOW CHECKED OUT BOOKS
bookRouter.post('/checked-out', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    console.log("Looking up user:", username);

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const checkouts = await prisma.checkout.findMany({
      where: {
        userId: user.id,
        returnDate: null, // Only current checkouts
      },
      include: {
        book: true,
      },
    });

    console.log("Found user:", user.id);
    console.log("Checkouts found:", checkouts.length);

    const books = checkouts.map((c) => c.book);

    res.json(books);
  } catch (error) {
    console.error("Error fetching checked-out books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// RETURN BOOK
bookRouter.post('/return', async (req, res) => {
  const { isbn } = req.body;

  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required to return a book" });
  }

  try {
    // Find the book by ISBN
    const book = await prisma.book.findUnique({
      where: { isbn },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.available) {
      return res.status(400).json({ error: "Book is already marked as available" });
    }

    // Update the book to available
    await prisma.book.update({
      where: { id: book.id },
      data: { available: true },
    });

    const latestCheckout = await prisma.checkout.findFirst({
      where: {
        bookId: book.id,
        returnDate: null,
      },
      orderBy: {
        checkoutDate: 'desc',
      },
    });

    if (latestCheckout) {
      await prisma.checkout.update({
        where: { id: latestCheckout.id },
        data: { returnDate: new Date() },
      });
    }

    res.status(200).json({ message: "Book returned successfully", title: book.title });
  } catch (error) {
    console.error("Return error:", error);
    res.status(500).json({ error: "Failed to return book" });
  }
});

// SHOW RETURNED BOOKS
bookRouter.post('/returned', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const checkouts = await prisma.checkout.findMany({
      where: {
        userId: user.id,
        NOT: {
          returnDate: null,
        },
      },
      include: {
        book: true,
      },
      orderBy: {
        returnDate: "desc",
      },
    });

    const books = checkouts.map((checkout) => checkout.book);

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching returned books:", error);
    res.status(500).json({ error: "Failed to retrieve returned books" });
  }
});

// GET ALL BOOKS
bookRouter.get('/all', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        isbn: 'asc',
      },
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        coverImage: true,
        available: true,
      },
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all books" });
  }
});

export default bookRouter;
