const StatsCard = ({ title, value, icon, color = "red" }) => {
  const colorClasses = {
    red: "from-red-500 to-pink-500",
    blue: "from-blue-500 to-indigo-500",
    green: "from-green-500 to-emerald-500",
    yellow: "from-yellow-500 to-orange-500",
    purple: "from-purple-500 to-pink-500",
  };

  return (
    <div
      className={`bg-linear-to-br ${colorClasses[color]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div className="text-5xl opacity-30">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
