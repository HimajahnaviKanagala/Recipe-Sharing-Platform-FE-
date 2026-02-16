import { useState } from "react";
import { aiAPI } from "../../services/api.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const RecipeSuggestions = () => {
  const [ingredients, setIngredients] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetSuggestions = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuggestions(null);

      const response = await aiAPI.getRecipeSuggestions(ingredients);
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGetSuggestions();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🤖</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI Recipe Suggestions
        </h2>
        <p className="text-gray-600">
          Tell me what ingredients you have, and I'll suggest recipes!
        </p>
      </div>

      {/* Input */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What ingredients do you have?
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., chicken, rice, tomatoes, garlic..."
            className="flex-1 input-field"
            disabled={loading}
          />
          <button
            onClick={handleGetSuggestions}
            disabled={loading || !ingredients.trim()}
            className="btn-primary"
          >
            {loading ? "Thinking..." : "Get Recipes 🚀"}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">
            AI is thinking of delicious recipes...
          </p>
        </div>
      )}

      {/* Suggestions */}
      {suggestions && !loading && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Here's what you can make! 👨‍🍳
          </h3>

          {Array.isArray(suggestions) ? (
            <div className="grid grid-cols-1 gap-6">
              {suggestions.map((recipe, index) => (
                <div
                  key={index}
                  className="card p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900">
                      {index + 1}. {recipe.name}
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        recipe.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : recipe.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{recipe.description}</p>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{recipe.cookingTime}</span>
                  </div>

                  {recipe.additionalIngredients &&
                    recipe.additionalIngredients.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Additional ingredients you might need:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {recipe.additionalIngredients.map((ing, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {recipe.instructions && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Quick Steps:
                      </p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {recipe.instructions}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 whitespace-pre-line">
                {suggestions.rawText}
              </p>
            </div>
          )}

          <div className="text-center pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setSuggestions(null);
                setIngredients("");
              }}
              className="btn-secondary"
            >
              Try Different Ingredients
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSuggestions;
