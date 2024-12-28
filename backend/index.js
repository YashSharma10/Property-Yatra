import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import  connectDb  from "./db/connection.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// const listingsRoutes = require("./routes/Property");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
connectDb();


// Routes
import authRoutes from "./routes/auth.route.js";
app.use("/api", authRoutes);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.use("/", listingsRoutes);
