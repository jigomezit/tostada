import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'

// GET - Obtener un usuario específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener usuario' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar usuario
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { email, nombre, role, password } = body

    const supabase = await createClient()
    const adminSupabase = createAdminClient()

    // Actualizar password si se proporciona
    if (password) {
      const { error: passwordError } = await adminSupabase.auth.admin.updateUserById(
        params.id,
        { password }
      )

      if (passwordError) {
        return NextResponse.json(
          { error: passwordError.message },
          { status: 400 }
        )
      }
    }

    // Actualizar datos en la tabla users
    const updateData: any = {}
    if (email) updateData.email = email
    if (nombre) updateData.nombre = nombre
    if (role) updateData.role = role

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar usuario
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const supabase = await createClient()
    const adminSupabase = createAdminClient()

    // Eliminar de la tabla users
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', params.id)

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 500 }
      )
    }

    // Eliminar de Auth de Supabase
    const { error: authError } = await adminSupabase.auth.admin.deleteUser(params.id)

    if (authError) {
      console.error('Error al eliminar usuario de auth:', authError)
      // No fallar si ya no existe en auth
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    )
  }
}

