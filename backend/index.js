const express = require("express");
const cors = require("cors");
const connectToMongoose = require("./db");

const app = express();

// Connect to MongoDB
connectToMongoose();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:3000",          // local frontend
  "https://s-notebook.vercel.app",  // deployed frontend
];

// CORS middleware - FIXED VERSION
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like Postman, curl, mobile apps
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS error: Origin not allowed"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"]
  })
);

// Handle preflight requests
// app.options("*", cors());

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Port
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
  console.log(`s.NoteBook backend running on port http://localhost:${port}`);
});