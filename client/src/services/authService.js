import api from "./api";

export async function signup(payload) {
  const { data } = await api.post("/auth/signup", payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function updateMe(payload) {
  const { data } = await api.patch("/auth/me", payload);
  return data;
}

export default { signup, login, getMe, updateMe };
