import { useState, useEffect } from "react";
import { adminAPI } from "../../services/api.js";
import { formatDate } from "../../utils/helpers.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await adminAPI.getUsers();
      setUsers(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, username) => {
    if (
      !window.confirm(
        `Are you sure you want to delete user "${username}"? This will also delete all their recipes.`,
      )
    ) {
      return;
    }

    try {
      await adminAPI.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleChangeRole = async (userId, currentRole, username) => {
    const roles = ["USER", "MODERATOR", "ADMIN"];
    const newRole = window.prompt(
      `Change role for "${username}"\nCurrent: ${currentRole}\n\nEnter new role (USER, MODERATOR, or ADMIN):`,
      currentRole,
    );

    if (!newRole || newRole === currentRole) return;

    if (!roles.includes(newRole.toUpperCase())) {
      alert("Invalid role! Must be USER, MODERATOR, or ADMIN");
      return;
    }

    try {
      await adminAPI.updateUserRole(userId, newRole.toUpperCase());
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole.toUpperCase() } : user,
        ),
      );
      alert("Role updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden justify-center">
      <div className="p-6 border-b border-gray-200 text-center">
        <h2 className="text-2xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">User Management</h2>
        <p className="text-gray-600 mt-1">Manage users and their roles</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-linear-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">
                        {user.username}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-gray-600">{user.email}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-800"
                        : user.role === "MODERATOR"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleChangeRole(user.id, user.role, user.username)
                      }
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Change Role
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="p-12 text-center text-gray-500">No users found</div>
      )}
    </div>
  );
};

export default UserManagement;
