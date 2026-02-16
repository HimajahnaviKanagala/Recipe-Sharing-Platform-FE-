import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/signup", data),
  login: (data) => api.post("/auth/login", data),
  getCurrentUser: () => api.get("/auth/me"),
};

// Recipe APIs
export const recipeAPI = {
  getAll: (params) => api.get("/recipes", { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  getMyRecipes: () => api.get("/recipes/my/recipes"),
  getUserRecipes: (userId) => api.get(`/recipes/user/${userId}`),
  create: (data) => api.post("/recipes", data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`),
  getCategories: () => api.get("/recipes/categories"),
};

// Admin APIs
export const adminAPI = {
  getUsers: (params) => api.get("/admin/users", { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateUserRole: (id, role) => api.patch(`/admin/users/${id}/role`, { role }),
  deleteRecipe: (id) => api.delete(`/admin/recipes/${id}`),
  toggleFeatured: (id) => api.patch(`/admin/recipes/${id}/feature`),
  getStats: () => api.get("/admin/stats"),
};

// AI APIs
export const aiAPI = {
  getRecipeSuggestions: (ingredients) => 
    api.post('/ai/recipe-suggestions', { ingredients }),
  chat: (message, conversationHistory) => 
    api.post('/ai/chat', { message, conversationHistory }),
};

export default api;

