# Plataforma de Apoyo para Personas Limpiaparabrisas

## Stack tecnológico
- **Frontend:** HTML + CSS + JavaScript
- **Base de datos:** PostgreSQL via Supabase
- **Autenticación:** Supabase Auth
- **Despliegue:** Vercel
- **CI/CD:** GitHub Actions

---

## Paso 1 — Configurar Supabase

1. Crea una cuenta en https://app.supabase.com
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta todo el contenido del archivo `database.sql`
4. Ve a **Settings → API** y copia:
   - **Project URL** → reemplaza `SUPABASE_URL` en `js/supabase.js`
   - **anon public key** → reemplaza `SUPABASE_KEY` en `js/supabase.js`

---

## Paso 2 — Subir a GitHub

```bash
git init
git add .
git commit -m "feat: proyecto inicial limpiaparabrisas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/limpiaparabrisas.git
git push -u origin main
```

---

## Paso 3 — Desplegar en Vercel

1. Entra a https://vercel.com
2. Click en **Add New Project**
3. Conecta tu repositorio de GitHub
4. Click en **Deploy**
5. Vercel te dará una URL pública automáticamente

---

## Paso 4 — Configurar GitHub Actions (CI/CD)

En tu repositorio de GitHub ve a **Settings → Secrets → Actions** y agrega:

- `VERCEL_TOKEN` → obtenlo en https://vercel.com/account/tokens
- `VERCEL_ORG_ID` → en Vercel, Settings → General
- `VERCEL_PROJECT_ID` → en tu proyecto Vercel, Settings → General

---

## Estrategia de ramas

```
main          ← producción (solo merges desde develop)
develop       ← integración
feature/login ← una rama por historia
feature/registro
feature/perfil
feature/panel-ong
```

---

## Estructura del proyecto

```
limpiaparabrisas/
├── index.html          ← Login
├── registro.html       ← Registro de cuenta
├── dashboard.html      ← Panel del limpiaparabrisas
├── perfil.html         ← Actualizar perfil
├── oportunidades.html  ← Ver oportunidades de apoyo
├── historial.html      ← Historial de atenciones
├── panel-ong.html      ← Panel ONG / Municipio
├── database.sql        ← Script SQL para Supabase
├── css/
│   └── styles.css
├── js/
│   ├── supabase.js     ← ⚠️ Configura tus credenciales aquí
│   ├── login.js
│   ├── registro.js
│   ├── dashboard.js
│   ├── perfil.js
│   ├── oportunidades.js
│   ├── historial.js
│   └── panel-ong.js
└── .github/
    └── workflows/
        └── deploy.yml  ← Pipeline CI/CD
```
