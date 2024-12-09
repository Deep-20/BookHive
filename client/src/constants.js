// Base URL for all API endpoints
const backendApiUrl = "http://localhost:8080/api";

// Available API route endpoints
const routes = {
  AUTHOR: "author",
  AUTH: "auth",
  BOOK: "book",
  BORROWAL: "borrowal",
  GENRE: "genre",
  USER: "user"
};

// Standard CRUD operation methods and custom methods
const methods = {
  GET: "get",
  GET_ALL: "getAll",
  POST: "add",
  PUT: "update",
  DELETE: "delete",
  REGISTER: "register"
};

/**
 * Constructs a full API URL based on the route, method, and optional ID
 * @param {string} route - The API route (e.g., 'author', 'book')
 * @param {string} method - The HTTP method to use (e.g., 'get', 'add')
 * @param {string} [id] - Optional ID parameter for specific resource operations
 * @returns {string} Complete API URL
 */
const apiUrl = (route, method, id = "") => `${backendApiUrl}/${route}/${method}${id && `/${id}`}`;

module.exports = { routes, methods, apiUrl };
