const express = require("express");
const app = express();
const cors = require("cors");
const { connectDb } = require("./db/connection");
const listingsRoutes = require("./routes/Property");

app.use(cors());
app.use(express.json());
app.use(express.json());

connectDb();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", listingsRoutes);
