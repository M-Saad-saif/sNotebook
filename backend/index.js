const connectToMongoose = require("./db");
const express = require("express");
var cors = require("cors");
var app = express();

// Connect to MongoDB
connectToMongoose();

// Enable CORS for all origins (for now)
// Allow only your deployed frontend
app.use(cors({
    origin: 'https://s-notebook.vercel.app', // frontend URL
    methods: ['GET','POST','PUT','DELETE'],
}));

// Use environment variable or default port
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Simple health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(port, () => {
  console.log(`s.NoteBook backend running on port http://localhost:${port}`);
});
