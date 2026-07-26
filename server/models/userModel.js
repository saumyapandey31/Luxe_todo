import { readCollection, writeCollection } from "../utils/jsonDb.js";

const COLLECTION = "users";

export function getAllUsers() {
  return readCollection(COLLECTION);
}

export function findUserByEmail(email) {
  return getAllUsers().find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
}

export function findUserById(id) {
  return getAllUsers().find((u) => u.id === id);
}

export function createUser(user) {
  const users = getAllUsers();
  users.push(user);
  writeCollection(COLLECTION, users);
  return user;
}

export function updateUser(id, updates) {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates, updatedAt: new Date().toISOString() };
  writeCollection(COLLECTION, users);
  return users[idx];
}

export default {
  getAllUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
};
