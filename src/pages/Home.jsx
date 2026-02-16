import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { recipeAPI } from "../services/api.js";
import RecipeList from "../components/recipes/RecipeList.jsx";
import SearchBar from "../components/recipes/SearchBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useState({
    search: "",
    category: "",
    featured: false,
  });

  const { user } = useAuth();

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError("");
      const params = {};

      if (searchParams.search) params.search = searchParams.search;
      if (searchParams.category) params.category = searchParams.category;
      if (searchParams.featured) params.featured = "true";

      const response = await recipeAPI.getAll(params);
      setRecipes(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await recipeAPI.getCategories();
      setCategories(response.data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, [searchParams]);

  const handleSearch = (searchTerm) => {
    setSearchParams({ ...searchParams, search: searchTerm });
  };

  const handleCategoryChange = (category) => {
    setSearchParams({ ...searchParams, category });
  };

  const toggleFeatured = () => {
    setSearchParams({ ...searchParams, featured: !searchParams.featured });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-center">
        <div className="container-custom py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight ">
              Discover & Share Amazing Recipes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Join our community of food lovers and explore thousands of
              delicious recipes from around the world.
            </p>
            {!user && (
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Search & Filter */}
        <SearchBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={toggleFeatured}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              searchParams.featured
                ? "bg-yellow-400 text-yellow-900 shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-yellow-400"
            }`}
          >
            {searchParams.featured ? "⭐ Featured" : "Show Featured"}
          </button>
          {searchParams.category && (
            <button
              onClick={() => setSearchParams({ ...searchParams, category: "" })}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Clear Category ✕
            </button>
          )}
          {searchParams.search && (
            <button
              onClick={() => setSearchParams({ ...searchParams, search: "" })}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Clear Search ✕
            </button>
          )}
        </div>

        {/* Recipe Count */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found{" "}
              <span className="font-bold text-gray-900">{recipes.length}</span>{" "}
              recipe{recipes.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Recipe List */}
        <RecipeList
          recipes={recipes}
          loading={loading}
          error={error}
          onRetry={fetchRecipes}
        />
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16 mt-16">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Share Your Recipes?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Join thousands of home cooks sharing their favorite dishes
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
