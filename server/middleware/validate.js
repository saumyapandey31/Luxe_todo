export function validateSignup(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required.");
  if (!password || password.length < 6) errors.push("Password must be at least 6 characters.");
  if (errors.length) return res.status(400).json({ success: false, message: errors[0], errors });
  next();
}

export function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = [];
  if (!email) errors.push("Email is required.");
  if (!password) errors.push("Password is required.");
  if (errors.length) return res.status(400).json({ success: false, message: errors[0], errors });
  next();
}

export function validateTask(req, res, next) {
  const { title } = req.body;
  if (req.method === "POST" && (!title || !title.trim())) {
    return res.status(400).json({ success: false, message: "Task title is required." });
  }
  next();
}

export default { validateSignup, validateLogin, validateTask };
