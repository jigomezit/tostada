"use client";

import { useState, useEffect } from "react";
import { User, UserFormData } from "@/lib/types";

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: user?.email || "",
    nombre: user?.nombre || "",
    role: user?.role || "customer",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const url = user
        ? `/api/admin/usuarios/${user.id}`
        : "/api/admin/usuarios";
      const method = user ? "PUT" : "POST";

      const body: any = {
        email: formData.email,
        nombre: formData.nombre,
        role: formData.role,
      };

      if (formData.password) {
        body.password = formData.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar usuario");
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-guitar-cream mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          className="w-full px-4 py-2 bg-guitar-dark border border-guitar-medium rounded-lg text-guitar-cream focus:outline-none focus:ring-2 focus:ring-guitar-gold focus:border-transparent"
          placeholder="usuario@ejemplo.com"
        />
      </div>

      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-guitar-cream mb-2"
        >
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          value={formData.nombre}
          onChange={(e) =>
            setFormData({ ...formData, nombre: e.target.value })
          }
          required
          className="w-full px-4 py-2 bg-guitar-dark border border-guitar-medium rounded-lg text-guitar-cream focus:outline-none focus:ring-2 focus:ring-guitar-gold focus:border-transparent"
          placeholder="Nombre completo"
        />
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-guitar-cream mb-2"
        >
          Rol
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value as "admin" | "customer",
            })
          }
          required
          className="w-full px-4 py-2 bg-guitar-dark border border-guitar-medium rounded-lg text-guitar-cream focus:outline-none focus:ring-2 focus:ring-guitar-gold focus:border-transparent"
        >
          <option value="customer">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-guitar-cream mb-2"
        >
          {user ? "Nueva Contraseña (dejar vacío para no cambiar)" : "Contraseña"}
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required={!user}
          className="w-full px-4 py-2 bg-guitar-dark border border-guitar-medium rounded-lg text-guitar-cream focus:outline-none focus:ring-2 focus:ring-guitar-gold focus:border-transparent"
          placeholder="••••••••"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-guitar-gold text-guitar-black font-bold rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Guardando..."
            : user
            ? "Actualizar Usuario"
            : "Crear Usuario"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-guitar-dark border border-guitar-medium text-guitar-cream font-bold rounded-lg hover:bg-guitar-medium transition-all duration-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

