import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { findUserByEmail, createUser, findUserById, updateUser } from "../models/userModel.js";

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existing = findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }
    const hashed = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();
    const user = createUser({
      id: uuidv4(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      avatarColor: ["#5B2D1D", "#C8A165", "#3B7D5D", "#B94A48"][Math.floor(Math.random() * 4)],
      xp: 0,
      level: 1,
      streakCurrent: 0,
      streakBest: 0,
      badges: [],
      createdAt: now,
      updatedAt: now,
    });
    const token = signToken(user);
    res.status(201).json({ success: true, token, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
    const token = signToken(user);
    res.json({ success: true, token, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = findUserById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    res.json({ success: true, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  try {
    const { name, moodToday } = req.body;
    const updates = {};
    if (name) updates.name = name.trim();
    if (moodToday) updates.moodToday = moodToday;
    const user = updateUser(req.user.id, updates);
    res.json({ success: true, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
}

export default { signup, login, getMe, updateMe };
