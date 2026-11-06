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

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  // THIS IS THE METHOD THAT WAS MISSING
  deleteUser(id) {
    delete this.storage[id];
  }

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
}

// Export a single instance (Singleton pattern)
module.exports = new UsersStorage();
