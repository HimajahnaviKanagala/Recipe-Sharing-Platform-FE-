import RecipeCard from "./RecipeCard";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorMessage from "../common/ErrorMessage.jsx";

const RecipeList = ({ recipes, loading, error, onRetry }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          No recipes found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or create a new recipe!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
