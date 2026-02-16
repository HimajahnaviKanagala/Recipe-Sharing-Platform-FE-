import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recipeAPI } from "../services/api.js";
import RecipeForm from "../components/recipes/RecipeForm.jsx";

const CreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");
      const response = await recipeAPI.create(formData);
      navigate(`/recipe/${response.data.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create recipe");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Create New Recipe
          </h1>
          <p className="text-gray-600">
            Share your culinary masterpiece with the world!
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <RecipeForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
