const { v4: uuidv4 } = require("uuid");

function getId() {
  return uuidv4();
}

let allUsers = [
  {
    id: getId(),
    username: "elif",
    password: "12345",
  },
  {
    id: getId(),
    username: "emre",
    password: "111999",
  },
  {
    id: getId(),
    username: "aysen",
    password: "1234a",
  },
  {
    id: getId(),
    username: "burcu",
    password: "1234b",
  },
];

function getAllUsers() {
  return allUsers;
}

function insertUser(user) {
  user.id = getId();
  allUsers.push(user);
  return user;
}

function login(user) {
  let existUser = null;
  for (let i = 0; i < allUsers.length; i++) {
    const item = allUsers[i];
    if (item.username === user.username && item.password === user.password) {
      existUser = item;
      break;
    }
  }
  return existUser;
}

module.exports = {
  getAllUsers,
  insertUser,
  login,
};
