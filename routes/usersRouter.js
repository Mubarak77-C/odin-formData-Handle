// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = Router();

// 1. Home / List route
usersRouter.get("/", usersController.usersListGet);

// 2. Create routes (MUST be placed before /:id routes)
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);

// 3. Update & Delete dynamic routes (/:id)
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);
usersRouter.post("/:id/delete", usersController.usersDeletePost);

module.exports = usersRouter;
