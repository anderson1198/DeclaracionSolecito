# 📧 Configuración de Notificaciones por Email

## ¿Qué hace esto?

Cuando Angie haga clic en "Sí", se enviará automáticamente un email a:
- dcalvete@intelecto.co
- dojeda@intelecto.co  
- cpulido@intelecto.co

---

## 🚀 Configuración (5 minutos)

### Paso 1: Crear cuenta en EmailJS

1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Clic en **"Sign Up Free"**
3. Crea tu cuenta (puedes usar Google)

### Paso 2: Conectar tu email

1. En el dashboard, ve a **"Email Services"**
2. Clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail recomendado):
   - **Gmail**: Selecciona "Gmail"
   - Autoriza tu cuenta de Gmail
   - Dale un nombre al servicio (ej: "Notificaciones Angie")
4. **IMPORTANTE**: Copia el **Service ID** que aparece (ej: `service_abc123`)

### Paso 3: Crear plantilla de email

1. Ve a **"Email Templates"**
2. Clic en **"Create New Template"**
3. Configura así:

   **Subject (Asunto):**
   ```
   {{subject}}
   ```

   **Content (Contenido del email):**
   ```
   ¡Hola!

   {{message}}

   Fecha y hora: {{date}}

   ---
   Invitación enviada desde la app romántica 💕
   ```

   **Settings (Configuración):**
   - **To Email**: Escribe aquí los 3 correos separados por comas:
     ```
     dcalvete@intelecto.co, dojeda@intelecto.co, cpulido@intelecto.co
     ```
   - Alternativamente, puedes dejar `{{to_email}}` y se usarán los correos del código

4. Clic en **"Save"**
5. **IMPORTANTE**: Copia el **Template ID** (ej: `template_xyz789`)

### Paso 4: Obtener tu Public Key

1. Ve a **"Account"** → **"General"**
2. Busca la sección **"Public Key"** o **"API Keys"**
3. **IMPORTANTE**: Copia tu **Public Key** (ej: `abcXYZ123_456789`)

### Paso 5: Actualizar el código

Abre el archivo `app.js` y reemplaza estas 3 líneas al inicio:

```javascript
const EMAILJS_PUBLIC_KEY = 'TU_CLAVE_PUBLICA_AQUI';  // La Public Key del Paso 4
const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID_AQUI';      // El Service ID del Paso 2
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';    // El Template ID del Paso 3
```

**Ejemplo:**
```javascript
const EMAILJS_PUBLIC_KEY = 'abcXYZ123_456789';
const EMAILJS_SERVICE_ID = 'service_gmail123';
const EMAILJS_TEMPLATE_ID = 'template_invitacion';
```

### Paso 6: ¡Listo!

Guarda los cambios y vuelve a desplegar tu aplicación en Vercel.

---

## 🧪 Probar que funciona

1. Abre tu página desplegada
2. Haz clic en **"¡Sí! 💖"**
3. En unos segundos, deberías recibir un email en las 3 direcciones

> **Nota**: EmailJS tiene un límite gratuito de **200 emails por mes**, más que suficiente para esta aplicación.

---

## 📋 Resumen Visual

```
1. EmailJS.com → Crear cuenta
2. Email Services → Añadir Gmail → Copiar Service ID
3. Email Templates → Crear plantilla → Copiar Template ID
4. Account → Copiar Public Key
5. app.js → Pegar las 3 claves
6. Desplegar en Vercel
7. ¡Probar!
```

---

## ❓ Problemas Comunes

### "No recibo emails"
- Verifica que hayas copiado correctamente las 3 claves
- Chequea la consola del navegador (F12) para ver errores
- Revisa la carpeta de SPAM

### "Error 403 o 401"
- La Public Key es incorrecta
- Verifica que hayas inicializado EmailJS correctamente

### "Template not found"
- El Template ID es incorrecto
- Asegúrate de haber guardado la plantilla

---

## 🔒 Seguridad

La Public Key de EmailJS es segura para usar en el navegador. EmailJS ya tiene protecciones contra spam y uso indebido.

---

¡Listo! Ahora recibirás una notificación cada vez que Angie diga que sí 💕🎉
