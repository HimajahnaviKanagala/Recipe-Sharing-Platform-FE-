import {
  formatTime,
  formatDate,
  getPlaceholderImage,
} from "../../utils/helpers.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const RecipeDetail = ({ recipe, onDelete }) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const imageUrl = recipe.image_url || getPlaceholderImage(800, 600);

  const isOwner = user?.id === recipe.user_id;
  const canEdit = isOwner || isAdmin();
  const canDelete = isOwner || isAdmin();

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      onDelete();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = getPlaceholderImage(800, 600);
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          {recipe.category && (
            <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold shadow-lg">
              {recipe.category}
            </span>
          )}
          {recipe.is_featured && (
            <span className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold shadow-lg flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Featured
            </span>
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Author & Meta Info */}
        <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {recipe.users && (
              <div className="flex items-center">
                <div className="w-12 h-12 bg-linear-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {recipe.users.username?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Recipe by</p>
                  <p className="font-semibold text-gray-900">
                    {recipe.users.username}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            {recipe.prep_time && (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Prep Time</p>
                  <p className="font-semibold">
                    {formatTime(recipe.prep_time)}
                  </p>
                </div>
              </div>
            )}
            {recipe.cook_time && (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                  <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Cook Time</p>
                  <p className="font-semibold">
                    {formatTime(recipe.cook_time)}
                  </p>
                </div>
              </div>
            )}
            {(recipe.prep_time || recipe.cook_time) && (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-semibold">
                    {formatTime(
                      (recipe.prep_time || 0) + (recipe.cook_time || 0),
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {recipe.description && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {recipe.description}
            </p>
          </div>
        )}

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🥘</span>
            Ingredients
          </h2>
          <div className="bg-red-50 rounded-xl p-6">
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line text-gray-800">
                {recipe.ingredients}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">👨‍🍳</span>
            Instructions
          </h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line text-gray-800">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Created on {formatDate(recipe.created_at)}
          </p>

          {/* Action Buttons */}
          {canEdit && (
            <div className="flex gap-3 mt-4 md:mt-0">
              {canEdit && (
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                  ✏️ Edit Recipe
                </button>
              )}
              {canDelete && (
                <button onClick={handleDelete} className="btn-danger">
                  🗑️ Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
