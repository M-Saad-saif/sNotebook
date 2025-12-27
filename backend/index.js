const connectToMongoose = require("./db");
const express = require("express");

connectToMongoose();
const app = express();
const port = 5000;

// using middleware...When a client sends data in JSON format (usually in POST, PUT, PATCH requests), Express cannot read it by default.
app.use(express.json())

// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`app is listening to the port http://localhost:${port}`);
});
