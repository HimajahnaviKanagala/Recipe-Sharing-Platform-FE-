import { useState } from "react";
import AdminDashboard from "../components/admin/AdminDashboard.jsx";
import UserManagement from "../components/admin/UserManagement.jsx";
import RecipeModeration from "../components/admin/RecipeModeration.jsx";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: "📊" },
    { id: "users", name: "User Management", icon: "👥" },
    { id: "recipes", name: "Recipe Moderation", icon: "🍽️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 just text-center">
          <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent ">Admin Panel</h1>
          <p className="text-gray-600">
            Manage users, recipes, and platform settings
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-red-600 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:border-b-2 hover:border-red-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "recipes" && <RecipeModeration />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
