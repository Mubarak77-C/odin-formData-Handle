const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

// ... (keep validation rules and create methods as they are)

// UPDATED: Handle search queries
exports.usersListGet = (req, res) => {
  const searchQuery = req.query.search || "";
  const users = usersStorage.findUsers(searchQuery);

  res.render("index", {
    title: "User List",
    users: users,
    searchQuery: searchQuery, // pass it back so the input stays filled
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", { title: "Create User" });
};

exports.usersCreatePost = [
  // ... (unchanged)
];
