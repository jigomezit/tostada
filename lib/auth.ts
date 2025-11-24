import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/admin/login')
  }
  return session
}

export async function isAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) return false
  
  // Verificar si el usuario tiene rol de admin en la tabla users
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()
  
  return data?.role === 'admin'
}

