"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  name: string | null;
  role: "super_admin" | "admin" | "pending";
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      
      if (response.status === 403) {
        setError("Access denied. Super admin privileges required.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
      setError("");
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: number, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    setUpdating(userId);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await fetchUsers();
    } catch (err) {
      alert("Failed to update user role");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    const action = currentStatus ? "deactivate" : "activate";
    if (!confirm(`Are you sure you want to ${action} this user?\n\nDeactivate: User cannot log in but account is preserved\nActivate: User can log in again`)) {
      return;
    }

    setUpdating(userId);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await fetchUsers();
    } catch (err) {
      alert("Failed to update user status");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const deleteUser = async (userId: number, email: string) => {
    if (!confirm(`⚠️ PERMANENT DELETE\n\nAre you sure you want to permanently delete this user?\n\nEmail: ${email}\n\nThis action CANNOT be undone. The user and all their data will be removed from the database.`)) {
      return;
    }

    setUpdating(userId);
    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete user");
      }

      await fetchUsers();
      alert("User deleted successfully");
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      super_admin: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      admin: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      pending: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
    };
    
    const labels = {
      super_admin: "Super Admin",
      admin: "Admin",
      pending: "Pending",
    };

    return (
      <Badge className={styles[role as keyof typeof styles]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <div className="text-gray-600">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
            <Button
              onClick={() => router.push("/admin")}
              className="mt-4"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">
          Manage admin users, roles, and permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {user.name || "No Name"}
                      </h3>
                      {getRoleBadge(user.role)}
                      {!user.isActive && (
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-1">{user.email}</p>
                    <div className="text-sm text-gray-500">
                      <p>
                        Created: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      {user.lastLogin && (
                        <p>
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Role change buttons - only show options different from current role */}
                    <div className="flex gap-2 flex-wrap">
                      {user.role !== "super_admin" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUserRole(user.id, "super_admin")}
                          disabled={updating === user.id}
                          className="text-purple-600 hover:bg-purple-50"
                        >
                          Make Super Admin
                        </Button>
                      )}
                      {user.role !== "admin" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUserRole(user.id, "admin")}
                          disabled={updating === user.id}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          {user.role === "super_admin" ? "Demote to Admin" : "Make Admin"}
                        </Button>
                      )}
                      {user.role !== "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUserRole(user.id, "pending")}
                          disabled={updating === user.id}
                          className="text-gray-600 hover:bg-gray-50"
                        >
                          Revoke Access
                        </Button>
                      )}
                    </div>

                    {/* Active/Inactive toggle and Delete */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id, user.isActive)}
                        disabled={updating === user.id}
                        className={
                          user.isActive
                            ? "text-orange-600 hover:bg-orange-50"
                            : "text-green-600 hover:bg-green-50"
                        }
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteUser(user.id, user.email)}
                        disabled={updating === user.id}
                        className="text-red-600 hover:bg-red-50 border-red-300"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
