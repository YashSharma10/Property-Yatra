import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDb from "./db/connection.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
connectDb();

// Routes
import authRoutes from "./routes/auth.route.js";
import propertyRoutes from "./routes/property.route.js";
import inquiryRoutes from "./routes/inquiry.model.js";
app.use("/api", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/inquiry", inquiryRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
