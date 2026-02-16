import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { recipeAPI } from "../services/api.js";
import RecipeList from "../components/recipes/RecipeList.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const fetchMyRecipes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await recipeAPI.getMyRecipes();
      setRecipes(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-red-50 to-pink-50 py-12">
      <div className="container-custom">
        {/* Header - Centered */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
            My Recipes
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Welcome back,{" "}
            <span className="font-bold text-red-600">{user?.username}</span>!
            Here are your culinary creations.
          </p>

          {/* Beautiful Create Button */}
          <Link
            to="/create-recipe"
            className="inline-flex items-center px-8 py-4 bg-linear-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4"></path>
            </svg>
            Create New Recipe
          </Link>
        </div>

        {/* Stats Card - Centered */}
        {!loading && !error && recipes.length > 0 && (
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-linear-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 mb-2 text-sm font-medium uppercase tracking-wide">
                    Total Recipes
                  </p>
                  <p className="text-5xl font-bold">{recipes.length}</p>
                  <p className="text-red-100 mt-2 text-sm">
                    {recipes.length === 1
                      ? "recipe created"
                      : "recipes created"}
                  </p>
                </div>
                <div className="text-7xl opacity-30">📚</div>
              </div>
            </div>
          </div>
        )}

        {/* Recipe List - Centered Grid */}
        <div className="max-w-7xl mx-auto">
          <RecipeList
            recipes={recipes}
            loading={loading}
            error={error}
            onRetry={fetchMyRecipes}
          />
        </div>

        {/* Empty State with Beautiful CTA - Centered */}
        {!loading && !error && recipes.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-20 bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-200 hover:border-red-300 transition-all duration-300">
              <div className="mb-6">
                <div className="text-8xl mb-4 animate-bounce">👨‍🍳</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                No recipes yet
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Start your culinary journey by creating your first recipe and
                share it with the world!
              </p>
              <Link
                to="/create-recipe"
                className="inline-flex items-center px-10 py-5 bg-linear-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                Create Your First Recipe
              </Link>

              {/* Additional Tips */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">✍️</div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Easy to Create
                  </h4>
                  <p className="text-sm text-gray-600">
                    Simple form to add your recipe details
                  </p>
                </div>
                <div className="bg-pink-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">🌟</div>
                  <h4 className="font-bold text-gray-900 mb-2">Get Featured</h4>
                  <p className="text-sm text-gray-600">
                    Great recipes can be featured by admins
                  </p>
                </div>
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">🤝</div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Share & Inspire
                  </h4>
                  <p className="text-sm text-gray-600">
                    Help others discover amazing dishes
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
