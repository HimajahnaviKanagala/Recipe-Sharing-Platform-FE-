import { Link } from "react-router-dom";
import {
  formatTime,
  truncateText,
  getPlaceholderImage,
} from "../../utils/helpers";

const RecipeCard = ({ recipe }) => {
  const imageUrl = recipe.image_url || getPlaceholderImage();

  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <div className=" px-5 py-5 rounded-2xl card h-full transform transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-xl">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = getPlaceholderImage();
            }}
          />
          {recipe.is_featured && (
            <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Featured
            </div>
          )}
          {recipe.category && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {recipe.category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {truncateText(recipe.description, 100) ||
              "No description available"}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            {recipe.prep_time && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Prep: {formatTime(recipe.prep_time)}</span>
              </div>
            )}
            {recipe.cook_time && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
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
                <span>Cook: {formatTime(recipe.cook_time)}</span>
              </div>
            )}
          </div>

          {/* Author */}
          {recipe.users && (
            <div className="flex items-center pt-4 border-t border-gray-100">
              <div className="w-8 h-8 bg-linear-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {recipe.users.username?.charAt(0).toUpperCase()}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                by {recipe.users.username}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
