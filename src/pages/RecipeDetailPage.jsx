import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipeAPI } from "../services/api.js";
import RecipeDetail from "../components/recipes/RecipeDetail.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await recipeAPI.getById(id);
      setRecipe(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch recipe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await recipeAPI.delete(id);
      navigate("/my-recipes");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete recipe");
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <ErrorMessage message={error} onRetry={fetchRecipe} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container-custom py-12">
        <ErrorMessage message="Recipe not found" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-red-600 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
          Back
        </button>

        <RecipeDetail recipe={recipe} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
