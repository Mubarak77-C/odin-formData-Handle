// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

// Renders index with form, list, and search
exports.usersIndexGet = (req, res) => {
  const searchQuery = req.query.search || "";
  const users = usersStorage.findUsers(searchQuery);

  res.render("index", {
    title: "User Management Dashboard",
    users: users,
    searchQuery: searchQuery,
  });
};

// Handles creation directly from the home page form
exports.usersCreatePost = [
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("First name is required and max 20 chars."),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name is required and max 20 chars."),
  body("email").trim().isEmail().withMessage("Must be a valid email address."),
  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be between 18 and 120."),
  body("bio")
    .optional({ values: "falsy" })
    .isLength({ max: 200 })
    .withMessage("Bio cannot exceed 200 characters."),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "User Management Dashboard",
        users: usersStorage.getUsers(),
        searchQuery: "",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update User",
    user: user,
  });
};

exports.usersUpdatePost = [
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("First name is required and max 20 chars."),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name is required and max 20 chars."),
  body("email").trim().isEmail().withMessage("Must be a valid email address."),
  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be between 18 and 120."),
  body("bio")
    .optional({ values: "falsy" })
    .isLength({ max: 200 })
    .withMessage("Bio cannot exceed 200 characters."),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update User",
        user: { id: req.params.id, ...req.body },
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};
