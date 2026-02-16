import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipeAPI } from "../services/api.js";
import RecipeForm from "../components/recipes/RecipeForm.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

const EditRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError("");
      await recipeAPI.update(id, formData);
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update recipe");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error && !recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorMessage message={error} onRetry={fetchRecipe} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Edit Recipe</h1>
          <p className="text-gray-600">Update your recipe details</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <RecipeForm
            initialData={recipe}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
