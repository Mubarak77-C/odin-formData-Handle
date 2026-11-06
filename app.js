const express = require("express");
const app = express();
const path = require("node:path");
const usersRouter = require("./routes/usersRouter");

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// CRITICAL: Middleware to parse form data from req.body
app.use(express.urlencoded({ extended: true }));

// Mount routers
app.use("/", usersRouter);

// Server listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running live on port ${PORT}!`);
});
