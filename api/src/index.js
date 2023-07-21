const express = require("express");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const data = require("../data.json");

app.get("/", (req, res) => {
  return res.json(data);
});

app.get("/users", (req, res) => {
  return res.json(data.login);
});

app.get("/books", (req, res) => {
  return res.json(data.books);
});

app.get("/books/history", (req, res) => {
  const history = [];

  data.books.map((book) => {
    book.rentHistory.map((user) => {
      user = {
        bookTitle: book.title,
        studentName: user.studentName,
        class: user.class,
        withdrawalDate: user.withdrawalDate,
        deliveryDate: user.deliveryDate,
      };

      history.push(user);
    });
  });

  return res.json(history);
});

app.post("/books", (req, res) => {
  const {
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    rentHistory,
  } = req.body;

  const book = {
    id: uuidv4(),
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    rentHistory,
  };

  data.books.push(book);

  return res.status(201).json(data);
});

app.put("/books", (req, res) => {
  const {
    id,
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    rentHistory,
  } = req.body;

  const bookIndex = data.books.findIndex((ind) => ind.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({ error: "Not Found" });
  }

  if (
    !title ||
    !author ||
    !genre ||
    !status ||
    !image ||
    !systemEntryDate ||
    !synopsis ||
    !rentHistory
  ) {
    return res.status(400).json({ error: "Not enough informations" });
  }

  const book = {
    id,
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    rentHistory,
  };

  data.books[bookIndex] = book;

  return res.json(data);
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  const idBook = data.books.findIndex((ind) => ind.id === id);

  if (idBook < 0) {
    return res.status(404).json({ error: "Not Found" });
  }

  data.books.splice(idBook, 1);

  return res.status(204).json(data.books);
});

app.listen(3001, () => {
  console.log("Server is online! Access on http://localhost:3001");
});
