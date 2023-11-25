require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/ApiRoutes");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
  })
);

// app.use('/admin/books',ApiRoutes); => apis will fire only at a specific route (/admin/books)
app.use(routes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
