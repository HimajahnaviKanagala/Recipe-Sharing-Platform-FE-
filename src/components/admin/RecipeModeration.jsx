import { useState, useEffect } from "react";
import { recipeAPI, adminAPI } from "../../services/api.js";
import { formatDate, truncateText } from "../../utils/helpers.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const RecipeModeration = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await recipeAPI.getAll();
      setRecipes(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId, title) => {
    if (!window.confirm(`Are you sure you want to delete recipe "${title}"?`)) {
      return;
    }

    try {
      await adminAPI.deleteRecipe(recipeId);
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
      alert("Recipe deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete recipe");
    }
  };

  const handleToggleFeatured = async (recipeId, currentStatus) => {
    try {
      await adminAPI.toggleFeatured(recipeId);
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, is_featured: !currentStatus }
            : recipe,
        ),
      );
      alert(
        `Recipe ${!currentStatus ? "featured" : "unfeatured"} successfully!`,
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to toggle featured status");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 text-center">
        <h2 className="text-2xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Recipe Moderation</h2>
        <p className="text-gray-600 mt-1">Manage and moderate all recipes</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Recipe
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recipes.map((recipe) => (
              <tr
                key={recipe.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      {recipe.image_url ? (
                        <img
                          src={recipe.image_url}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🍽️
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">
                        {recipe.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {truncateText(recipe.description, 50)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-gray-900">
                    {recipe.users?.username || "Unknown"}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                    {recipe.category || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {recipe.is_featured ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold flex items-center w-fit">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      Featured
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                      Regular
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(recipe.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleToggleFeatured(recipe.id, recipe.is_featured)
                      }
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        recipe.is_featured
                          ? "bg-gray-600 hover:bg-gray-700 text-white"
                          : "bg-yellow-600 hover:bg-yellow-700 text-white"
                      }`}
                    >
                      {recipe.is_featured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteRecipe(recipe.id, recipe.title)
                      }
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {recipes.length === 0 && (
        <div className="p-12 text-center text-gray-500">No recipes found</div>
      )}
    </div>
  );
};

export default RecipeModeration;
