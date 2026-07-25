# Portafolio — Carlos Zeta

Plantilla de portafolio web personal, tema **Black & White Elegante**, construida con **Bootstrap 5**, HTML semántico y CSS/JS puro (sin frameworks adicionales ni build steps).

## 📁 Estructura del proyecto

```
portfolio-carlos-zeta/
├── index.html      # Estructura y contenido de todas las secciones
├── style.css       # Variables, tema visual, componentes y responsive
├── script.js       # Preloader, cursor personalizado, animaciones e interactividad
└── README.md       # Este archivo
```

## 🚀 Cómo usarlo localmente

No requiere instalación ni dependencias de compilación.

1. Descomprime el archivo `.zip`.
2. Abre `index.html` directamente en tu navegador, **o** sirve la carpeta con un servidor local (recomendado para evitar restricciones de algunos navegadores):

   ```bash
   # Con Python 3
   python -m http.server 8000

   # Con Node (usando el paquete serve)
   npx serve .
   ```
3. Visita `http://localhost:8000` (o el puerto que indique tu servidor).

## ✏️ Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Foto de perfil (hero) | `index.html` → sección `#inicio`, atributo `src` de `.portrait-img` |
| Capturas de la galería y proyectos | `index.html` → secciones `#galeria` y `#proyectos`, atributos `src` de las etiquetas `<img>` |
| Enlaces de GitHub / descarga de cada proyecto | `index.html` → sección `#proyectos`, atributo `href` de cada `.btn-elegant` |
| Enlaces de LinkedIn y CompuTrabajo | `index.html` → sección `#contacto`, clase `.social-link` |
| Correo de contacto | `index.html` → sección `#sobre-mi`, enlace `mailto:` |
| Colores y tipografía | `style.css` → bloque `:root` (variables CSS) |
| Textos (nombre, lema, descripciones) | `index.html`, directamente en cada sección |

Todas las imágenes de muestra provienen de Unsplash con filtro a blanco y negro vía CSS (`filter: grayscale`). Sustitúyelas por tus propias capturas y fotografía para el resultado final.

## ✉️ Formulario de contacto (Formspree)

El formulario de la sección **Contacto** está listo para funcionar sin backend propio, usando [Formspree](https://formspree.io):

1. Crea una cuenta gratuita en [formspree.io](https://formspree.io).
2. Crea un nuevo formulario y copia el endpoint que te asignan (algo como `https://formspree.io/f/xxxxabcd`).
3. Abre `index.html`, busca el comentario `IMPORTANTE — INTEGRACIÓN CON FORMSPREE` dentro de la sección `#contacto`, y reemplaza el valor del atributo `action`:

   ```html
   <form action="https://formspree.io/f/TU_ID_DE_FORMSPREE" method="POST" class="contact-form" novalidate>
   ```

   por tu endpoint real:

   ```html
   <form action="https://formspree.io/f/xxxxabcd" method="POST" class="contact-form" novalidate>
   ```

4. Listo. El formulario enviará los campos **Nombre**, **Correo** y **Mensaje** directamente a tu bandeja de Formspree, sin necesidad de servidor propio.

## 🌐 Despliegue (hosting gratuito)

Como es un sitio 100% estático, puedes desplegarlo en cualquiera de estas opciones:

### GitHub Pages
1. Sube el contenido de la carpeta a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En "Source", selecciona la rama `main` y la carpeta `/root`.
4. Guarda; tu sitio quedará disponible en `https://tu-usuario.github.io/tu-repositorio/`.

### Netlify
1. Arrastra y suelta la carpeta del proyecto en [app.netlify.com/drop](https://app.netlify.com/drop).
2. Netlify generará una URL pública al instante.

### Vercel
1. Instala la CLI: `npm i -g vercel`.
2. Dentro de la carpeta del proyecto, ejecuta `vercel`.
3. Sigue las instrucciones en pantalla.

## ♿ Accesibilidad y buenas prácticas incluidas

- HTML semántico (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`).
- Texto alternativo (`alt`) descriptivo en todas las imágenes.
- Enlace "Saltar al contenido principal" para navegación por teclado.
- Estados de foco visibles (`:focus-visible`).
- Soporte para `prefers-reduced-motion` (desactiva animaciones si el usuario lo prefiere).
- Contraste alto entre texto y fondo, acorde al tema monocromático.
- Diseño 100% responsivo, enfoque *Mobile First*.

## 🖱️ Notas sobre el cursor personalizado

El cursor con efecto *glow* solo se activa en dispositivos con puntero fino (`hover: hover` y `pointer: fine`), por lo que en móviles y tablets se usa el cursor nativo del sistema automáticamente — no afecta la experiencia táctil.

## 🛠️ Tecnologías utilizadas

- [Bootstrap 5.3](https://getbootstrap.com/) (vía CDN)
- [Bootstrap Icons](https://icons.getbootstrap.com/) (vía CDN)
- Google Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Inter](https://fonts.google.com/specimen/Inter)
- HTML5, CSS3 (variables nativas), JavaScript (Vanilla, ES6+)

---

Hecho con atención al detalle para **Carlos Zeta** — Desarrollador Web Freelance.
