import { useState, useEffect } from "react";

const RecipeForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    prep_time: "",
    cook_time: "",
    category: "",
    image_url: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    }

    if (formData.prep_time && formData.prep_time < 0) {
      newErrors.prep_time = "Prep time must be positive";
    }

    if (formData.cook_time && formData.cook_time < 0) {
      newErrors.cook_time = "Cook time must be positive";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert empty strings to null for optional fields
      const dataToSubmit = {
        ...formData,
        prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
        cook_time: formData.cook_time ? parseInt(formData.cook_time) : null,
        category: formData.category || null,
        image_url: formData.image_url || null,
      };
      onSubmit(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Recipe Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all ${errors.title ? "border-red-500" : ""}`}
          placeholder="e.g., Spaghetti Carbonara"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all"
          placeholder="Brief description of your recipe..."
        />
      </div>

      {/* Category & Image URL Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all"
          >
            <option value="">Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Snack">Snack</option>
            <option value="Beverage">Beverage</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="American">American</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Asian">Asian</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Paste a link to an image of your dish
          </p>
        </div>
      </div>

      {/* Prep Time & Cook Time Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prep Time */}
        <div>
          <label
            htmlFor="prep_time"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Prep Time (minutes)
          </label>
          <input
            type="number"
            id="prep_time"
            name="prep_time"
            value={formData.prep_time}
            onChange={handleChange}
            min="0"
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all ${errors.prep_time ? "border-red-500" : ""}`}
            placeholder="15"
          />
          {errors.prep_time && (
            <p className="text-red-500 text-sm mt-1">{errors.prep_time}</p>
          )}
        </div>

        {/* Cook Time */}
        <div>
          <label
            htmlFor="cook_time"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Cook Time (minutes)
          </label>
          <input
            type="number"
            id="cook_time"
            name="cook_time"
            value={formData.cook_time}
            onChange={handleChange}
            min="0"
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all ${errors.cook_time ? "border-red-500" : ""}`}
            placeholder="30"
          />
          {errors.cook_time && (
            <p className="text-red-500 text-sm mt-1">{errors.cook_time}</p>
          )}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <label
          htmlFor="ingredients"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Ingredients <span className="text-red-500">*</span>
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows="8"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all font-mono text-sm ${errors.ingredients ? "border-red-500" : ""}`}
          placeholder="List your ingredients, one per line:&#10;- 400g spaghetti&#10;- 200g pancetta&#10;- 4 eggs&#10;- 100g parmesan cheese"
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          List each ingredient on a new line
        </p>
      </div>

      {/* Instructions */}
      <div>
        <label
          htmlFor="instructions"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Instructions <span className="text-red-500">*</span>
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows="10"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 transition-all font-mono text-sm ${errors.instructions ? "border-red-500" : ""}`}
          placeholder="Step-by-step instructions:&#10;1. Boil the spaghetti in salted water&#10;2. Fry the pancetta until crispy&#10;3. Beat eggs and mix with parmesan&#10;4. Combine everything while pasta is hot"
        />
        {errors.instructions && (
          <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Write clear, step-by-step instructions
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className="px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" disabled={loading}>
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : initialData ? (
            "Update Recipe"
          ) : (
            "Create Recipe"
          )}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
