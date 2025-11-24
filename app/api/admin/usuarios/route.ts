import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'

// GET - Obtener todos los usuarios
export async function GET() {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo usuario
export async function POST(request: Request) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { email, nombre, role, password } = body

    if (!email || !nombre || !role) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const adminSupabase = createAdminClient()

    // Crear usuario en Auth de Supabase
    let authUserId: string | null = null
    if (password) {
      const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      })

      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 })
      }

      authUserId = authData.user.id
    }

    // Crear registro en la tabla users
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: authUserId || undefined,
        email,
        nombre,
        role,
      })
      .select()
      .single()

    if (error) {
      // Si falla la inserción pero se creó el usuario en auth, intentar limpiar
      if (authUserId) {
        await adminSupabase.auth.admin.deleteUser(authUserId)
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    )
  }
}

