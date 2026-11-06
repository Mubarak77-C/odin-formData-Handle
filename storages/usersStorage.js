// storages/usersStorage.js
class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id++;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  getUsers() {
    return Object.values(this.storage);
  }

  // NEW: Search filter method
  findUsers(searchQuery) {
    const users = this.getUsers();
    if (!searchQuery) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }

  // ... (keep getUser, updateUser, deleteUser as they are)
}

module.exports = new UsersStorage();
