import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-guitar-black via-guitar-dark to-guitar-medium px-4">
      <div className="w-full max-w-md">
        <div className="bg-guitar-dark/80 backdrop-blur-sm border border-guitar-medium rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-guitar-cream mb-2">
              Panel de Administración
            </h1>
            <p className="text-guitar-gold">Inicia sesión para continuar</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

