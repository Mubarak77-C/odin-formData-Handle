// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

exports.usersListGet = (req, res) => {
  const searchQuery = req.query.search || "";
  const users = usersStorage.findUsers(searchQuery);

  res.render("index", {
    title: "User List",
    users: users,
    searchQuery: searchQuery,
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create User",
  });
};

// Combined validation array + controller handler function
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

  // Final handler callback
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];
