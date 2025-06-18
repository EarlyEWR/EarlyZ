import express from "express";
import { authRouter } from "./src/routes/authRoutes.js";
import bookRouter from "./src/routes/bookRoutes.js";

const app = express();
const port = process.env.SERVER_PORT || 5000;

// Custom CORS Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// JSON Middleware
app.use(express.json());

// Routes
app.use("/auth", authRouter); 
app.use("/api/books", bookRouter);

// Health Check Route
app.get("/api/ping", (req, res) => {
  res.send({
    msg: "Hello, World",
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});