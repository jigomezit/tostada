# Configuración de Admin Interface con Supabase

## Requisitos Previos

1. Crear un proyecto en [Supabase](https://supabase.com)
2. Obtener las credenciales de tu proyecto:
   - URL del proyecto
   - Anon Key (clave pública)
   - Service Role Key (clave privada - solo para servidor)

## Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

**Importante:** El `SUPABASE_SERVICE_ROLE_KEY` es necesario para crear y gestionar usuarios desde el panel de admin. Esta clave debe mantenerse secreta y nunca exponerse al cliente.

## Configuración de la Base de Datos

1. Ve a tu proyecto de Supabase
2. Navega a SQL Editor
3. Ejecuta el contenido del archivo `supabase/migrations/001_initial_schema.sql`

Esto creará:
- La tabla `users` con los campos necesarios
- Las políticas de Row Level Security (RLS)
- Los índices para optimizar las consultas
- Los triggers para actualizar `updated_at` automáticamente

## Crear el Primer Usuario Administrador

Después de ejecutar la migración, necesitas crear el primer usuario administrador. Tienes dos opciones:

### Opción 1: Desde Supabase Dashboard

1. Ve a Authentication > Users en tu proyecto de Supabase
2. Crea un nuevo usuario manualmente
3. Luego ejecuta este SQL para agregarlo a la tabla `users` con rol admin:

```sql
INSERT INTO users (id, email, nombre, rol)
VALUES (
  'id_del_usuario_de_auth',
  'tu@email.com',
  'Tu Nombre',
  'admin'
);
```

### Opción 2: Usando SQL directamente

```sql
-- Crear usuario en auth.users (requiere service role key o desde dashboard)
-- Luego insertar en la tabla users:
INSERT INTO users (id, email, nombre, rol)
VALUES (
  gen_random_uuid(), -- o el ID del usuario de auth si ya existe
  'admin@ejemplo.com',
  'Administrador',
  'admin'
);
```

## Uso

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Navega a `http://localhost:3000/admin/login`
3. Inicia sesión con las credenciales del usuario administrador
4. Desde el dashboard podrás gestionar usuarios

## Estructura de Archivos

- `lib/supabase/` - Clientes de Supabase (client, server, admin)
- `lib/auth.ts` - Funciones helper de autenticación
- `lib/types.ts` - Tipos TypeScript
- `app/admin/` - Rutas del panel de administración
- `components/admin/` - Componentes de la interfaz admin
- `app/api/admin/` - API routes para CRUD de usuarios
- `supabase/migrations/` - Migraciones de base de datos
- `middleware.ts` - Protección de rutas

## Notas Importantes

- El middleware protege automáticamente todas las rutas `/admin/*` excepto `/admin/login`
- Solo usuarios con rol `admin` pueden acceder a la gestión de usuarios
- Las políticas RLS en Supabase aseguran que solo los admins puedan ver y modificar usuarios
- El `SUPABASE_SERVICE_ROLE_KEY` solo se usa en las API routes del servidor, nunca en el cliente

