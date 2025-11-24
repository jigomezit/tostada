"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import UserForm from "./UserForm";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/usuarios");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al cargar usuarios");
      }

      setUsers(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar usuario");
      }

      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingUser(undefined);
    fetchUsers();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  if (showForm) {
    return (
      <div className="bg-guitar-dark/80 border border-guitar-medium rounded-xl p-6">
        <h2 className="text-2xl font-bold text-guitar-cream mb-6">
          {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>
        <UserForm
          user={editingUser}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-guitar-cream">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-guitar-cream">Usuarios</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-guitar-gold text-guitar-black font-bold rounded-lg hover:bg-opacity-90 transition-all duration-300"
        >
          + Nuevo Usuario
        </button>
      </div>

      <div className="bg-guitar-dark/80 border border-guitar-medium rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-guitar-black border-b border-guitar-medium">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-guitar-cream">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-guitar-cream">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-guitar-cream">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-guitar-cream">
                  Fecha de Creación
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-guitar-cream">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-guitar-medium">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-guitar-cream"
                  >
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-guitar-black/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-guitar-cream">{user.email}</td>
                    <td className="px-6 py-4 text-guitar-cream">{user.nombre}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-guitar-gold text-guitar-black"
                            : "bg-guitar-medium text-guitar-cream"
                        }`}
                      >
                        {user.role === "admin" ? "👑 Admin" : "👤 Cliente"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-guitar-cream">
                      {new Date(user.created_at).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="px-4 py-2 bg-guitar-medium text-guitar-cream rounded-lg hover:bg-opacity-80 transition-all"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

