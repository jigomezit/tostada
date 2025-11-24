import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const user = await getUser();

  // Obtener estadísticas
  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: adminUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");

  const { count: regularUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "customer");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-guitar-cream mb-2">
          Dashboard
        </h1>
        <p className="text-guitar-gold">
          Bienvenido al panel de administración
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-guitar-dark/80 border border-guitar-medium rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-guitar-cream">
              Total de Usuarios
            </h3>
            <span className="text-3xl">👥</span>
          </div>
          <p className="text-4xl font-bold text-guitar-gold">
            {totalUsers || 0}
          </p>
        </div>

        <div className="bg-guitar-dark/80 border border-guitar-medium rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-guitar-cream">
              Administradores
            </h3>
            <span className="text-3xl">👑</span>
          </div>
          <p className="text-4xl font-bold text-guitar-gold">
            {adminUsers || 0}
          </p>
        </div>

        <div className="bg-guitar-dark/80 border border-guitar-medium rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-guitar-cream">
              Usuarios Regulares
            </h3>
            <span className="text-3xl">👤</span>
          </div>
          <p className="text-4xl font-bold text-guitar-gold">
            {regularUsers || 0}
          </p>
        </div>
      </div>

      <div className="bg-guitar-dark/80 border border-guitar-medium rounded-xl p-6">
        <h2 className="text-2xl font-bold text-guitar-cream mb-4">
          Información de Sesión
        </h2>
        <div className="space-y-2 text-guitar-cream">
          <p>
            <span className="text-guitar-gold font-semibold">Email:</span>{" "}
            {user?.email}
          </p>
          <p>
            <span className="text-guitar-gold font-semibold">ID:</span>{" "}
            {user?.id}
          </p>
        </div>
      </div>
    </div>
  );
}

