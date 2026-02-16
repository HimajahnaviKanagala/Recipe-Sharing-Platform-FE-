import { useState, useEffect } from "react";
import { adminAPI } from "../../services/api.js";
import StatsCard from "./StatsCard.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await adminAPI.getStats();
      setStats(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon="👥"
          color="blue"
        />
        <StatsCard
          title="Total Recipes"
          value={stats?.totalRecipes || 0}
          icon="🍽️"
          color="red"
        />
        <StatsCard
          title="Featured Recipes"
          value={stats?.featuredRecipes || 0}
          icon="⭐"
          color="yellow"
        />
        <StatsCard
          title="New Users (7d)"
          value={stats?.recentActivity?.newUsersLast7Days || 0}
          icon="📈"
          color="green"
        />
      </div>

      {/* User Roles Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Users by Role</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Regular Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.usersByRole?.USER || 0}
                </p>
              </div>
              <div className="text-4xl">👤</div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 mb-1">Moderators</p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats?.usersByRole?.MODERATOR || 0}
                </p>
              </div>
              <div className="text-4xl">🛡️</div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 mb-1">Admins</p>
                <p className="text-3xl font-bold text-red-900">
                  {stats?.usersByRole?.ADMIN || 0}
                </p>
              </div>
              <div className="text-4xl">👑</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity (Last 7 Days)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-2xl mr-4">
              👥
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">New Users</p>
              <p className="text-2xl font-bold text-green-900">
                {stats?.recentActivity?.newUsersLast7Days || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-2xl mr-4">
              🍽️
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">New Recipes</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats?.recentActivity?.newRecipesLast7Days || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
