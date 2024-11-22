require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Books");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(
  cors()
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = {};
    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    const formattedData = data.map((book) => ({
      id: book._id,
      title: book.title,
      slug: book.slug,
      author: book.author,
      stars: book.stars,
      description: book.description,
      category: book.category,
      thumbnail: book.thumbnail,
      createdAt: book.createdAt,
      publishedAt: book.publishedAt,
      updatedAt: book.updatedAt,
    }));
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const data = await Book.findOne({ slug: slugParam });
    if (!data) {
      return res.status(404).json({ message: "Book not found." });
    }
    const formattedData = {
      id: data._id,
      title: data.title,
      slug: data.slug,
      author: data.author,
      stars: data.stars,
      description: data.description,
      category: data.category,
      thumbnail: data.thumbnail,
      createdAt: data.createdAt,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
    };
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the book." });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.slug ||
      !req.body.author ||
      !req.body.description ||
      !req.body.category
    ) {
      return res.status(201).json({ error: "All fields are required." });
    }

    const categoriesArray = req.body.category
      .split(",")
      .map((cat) => cat.trim());

    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author,
      stars: req.body.stars ? parseInt(req.body.stars) : 0,
      description: req.body.description,
      category: categoriesArray,
      thumbnail: req.file ? req.file.filename : null,
      publishedAt: new Date(),
    });

    const savedBook = await newBook.save();
    res.status(201).json({
      message: "Book created successfully",
      book: {
        id: savedBook._id,
        title: savedBook.title,
        slug: savedBook.slug,
        author: savedBook.author,
        stars: savedBook.stars,
        description: savedBook.description,
        category: savedBook.category,
        thumbnail: savedBook.thumbnail,
        createdAt: savedBook.createdAt,
        publishedAt: savedBook.publishedAt,
        updatedAt: savedBook.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the book." });
  }
});

app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      author: req.body.author,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category.split(",").map((cat) => cat.trim()),
      updatedAt: new Date(),
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    const updatedData = await Book.findByIdAndUpdate(bookId, updateBook, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).json({ message: "Book not found." });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the book." });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.json({ message: "Book deleted successfully", id: deletedBook._id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book." });
  }
});

app.get("/", (req, res) => {
  res.json("Hello mate! ");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

