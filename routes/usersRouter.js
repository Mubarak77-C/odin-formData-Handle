// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = Router();

// Main Dashboard (List, Search, and Create Form)
usersRouter.get("/", usersController.usersIndexGet);
usersRouter.post("/", usersController.usersCreatePost);

// Update and Delete routes
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);
usersRouter.post("/:id/delete", usersController.usersDeletePost);

module.exports = usersRouter;
