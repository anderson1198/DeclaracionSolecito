# 🚀 Desplegar en Vercel - Next.js App

## ✅ ¡Tu aplicación Next.js está lista!

La aplicación ha sido migrada completamente a Next.js 14 con App Router.

---

## 📁 Estructura del Proyecto

```
appDeclaracionSolecito/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.js          # API para enviar emails
│   ├── layout.js                  # Layout principal con fuentes
│   ├── page.js                    # Componente principal React
│   ├── page.module.css            # Estilos CSS modules
│   └── globals.css                # Estilos globales
├── public/
│   └── solecito.svg               # Imagen del sol
├── .env.local                     # Variables de entorno (local)
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

---

## 🚀 Desplegar en Vercel

### Opción 1: Desde GitHub (Recomendado)

#### **Paso 1: Subir a GitHub**

```bash
cd d:\source\appDeclaracionSolecito
git init
git add .
git commit -m "Aplicación Next.js para invitar a Angie 💕"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/invitacion-angie.git
git push -u origin main
```

#### **Paso 2: Importar en Vercel**

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

#### **Paso 3: Configurar Variables de Entorno**

Antes de deployar, agrega estas variables en Vercel:

| Variable | Valor |
|----------|-------|
| `MAIL_HOST` | `smtp.hostinger.com` |
| `MAIL_PORT` | `587` |
| `MAIL_USERNAME` | `iarrieta31@apexlogic.com.co` |
| `MAIL_PASSWORD` | `Sonicboom4071!` |
| `MAIL_FROM` | `iarrieta31@apexlogic.com.co` |
| `MAIL_TO` | `dcalvete@intelecto.co,dojeda@intelecto.co,cpulido@intelecto.co,jplata@intelecto.co,cbustos@intelecto.co,cluna@intelecto.co` |

**Marca todas las variables para:** Development, Preview y Production

#### **Paso 4: Deploy**

1. Haz clic en **"Deploy"**
2. Espera 1-2 minutos
3. ¡Listo! Tu URL:
   ```
   https://invitacion-angie.vercel.app
   ```

---

### Opción 2: Deploy Directo con Vercel CLI

Si tienes Node.js instalado:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
cd d:\source\appDeclaracionSolecito
vercel

# Seguir las instrucciones
# Al final te preguntará por las variables de entorno
```

---

## 🧪 Probar Localmente Primero

Antes de desplegar, prueba que todo funcione:

### **1. Instalar dependencias**
```bash
npm install
```

### **2. Ejecutar en modo desarrollo**
```bash
npm run dev
```

### **3. Abrir en el navegador**
```
http://localhost:3000
```

### **4. Probar funcionalidad**
- ✅ El botón "No" se mueve al pasar el mouse
- ✅ Al hacer clic en "Sí" muestra mensaje de éxito
- ✅ Se envía email de notificación (verifica en consola)

---

## 📧 Correos de Notificación

Se enviará email automáticamente a:
- dcalvete@intelecto.co
- dojeda@intelecto.co
- cpulido@intelecto.co
- jplata@intelecto.co
- cbustos@intelecto.co
- cluna@intelecto.co

---

## 🔄 Actualizar Después del Deploy

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Vercel re-desplegará automáticamente.

---

## ✨ Ventajas de Next.js

✅ **Rendimiento optimizado** - Carga más rápida  
✅ **SEO mejorado** - Mejor indexación en buscadores  
✅ **Imágenes optimizadas** - Automáticamente  
✅ **Google Fonts optimizado** - Sin parpadeos  
✅ **API Routes seguras** - Backend integrado  
✅ **Deploy automático** - Con cada push a Git  

---

## 🔐 Seguridad

- ✅ Credenciales SMTP protegidas en variables de entorno
- ✅ `.env.local` nunca se sube a GitHub
- ✅ API routes corren en el servidor, no en el navegador
- ✅ HTTPS automático en Vercel

---

¡Listo para compartir con Angie! 💕✨
