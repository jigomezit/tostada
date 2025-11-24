"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/usuarios", label: "Usuarios", icon: "👥" },
  ];

  return (
    <aside className="w-64 bg-guitar-black border-r border-guitar-medium min-h-screen flex flex-col">
      <div className="p-6 border-b border-guitar-medium">
        <h2 className="text-xl font-bold text-guitar-cream">Admin Tostada</h2>
        <p className="text-sm text-guitar-gold mt-1">Panel de Control</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-guitar-gold text-guitar-black font-semibold"
                  : "text-guitar-cream hover:bg-guitar-dark hover:text-guitar-gold"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-guitar-medium">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-guitar-cream hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
        >
          <span className="text-xl">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

