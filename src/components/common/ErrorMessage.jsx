const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 text-5xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-red-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-600 mb-4">
        {message || "An unexpected error occurred"}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
