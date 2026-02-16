import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AdminRoute from "./components/auth/AdminRoute.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyRecipes from "./pages/MyRecipes.jsx";
import CreateRecipe from "./pages/CreateRecipes.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />

            {/* Protected Routes */}
            <Route
              path="/my-recipes"
              element={
                <ProtectedRoute>
                  <MyRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-recipe"
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-recipe/:id"
              element={
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />

            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                      404
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">Page not found</p>
                    <a href="/" className="btn-primary">
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
