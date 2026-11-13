export const USERS_KEY = "worklink-demo-users";
export const USER_KEY = "user";
export const TOKEN_KEY = "token";

export function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    return localStorage.getItem(TOKEN_KEY) && user ? user : null;
  } catch {
    return null;
  }
}

export function notifyAuthChange() {
  window.dispatchEvent(new Event("worklink-auth-change"));
}

export function readProjects(fallback = []) {
  try {
    const projects = JSON.parse(
      localStorage.getItem("worklink-projects") || "[]",
    );
    return Array.isArray(projects) ? projects : fallback;
  } catch {
    return fallback;
  }
}
