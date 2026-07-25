/* ==========================================================================
   PORTAFOLIO — CARLOS ZETA — script.js
   Contiene: preloader animado, cursor personalizado, animación de barras
   de habilidades al hacer scroll, y utilidades menores.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. PRELOADER — efecto de máquina de escribir para "Carlos Zeta"
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const nameEl = document.getElementById('preloader-name');
  const fullName = 'Carlos Zeta';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const typeName = () => {
    let i = 0;
    const typingSpeed = 110; // ms por carácter

    const typeChar = () => {
      if (i < fullName.length) {
        nameEl.textContent += fullName.charAt(i);
        i++;
        setTimeout(typeChar, typingSpeed);
      } else {
        // Espera un momento tras completar el texto antes de ocultar el preloader
        setTimeout(hidePreloader, 900);
      }
    };
    typeChar();
  };

  const hidePreloader = () => {
    if (!preloader) return;
    preloader.classList.add('is-hidden');
    document.body.style.overflow = '';
    // Elimina el preloader del flujo de accesibilidad tras la transición
    setTimeout(() => {
      preloader.setAttribute('aria-hidden', 'true');
    }, 850);
  };

  if (preloader && nameEl) {
    document.body.style.overflow = 'hidden';
    if (prefersReducedMotion) {
      nameEl.textContent = fullName;
      setTimeout(hidePreloader, 400);
    } else {
      typeName();
      // Salvaguarda: si algo falla, no dejar al usuario bloqueado más de 5s
      setTimeout(hidePreloader, 5000);
    }
  }

  /* ------------------------------------------------------------------------
     2. CURSOR PERSONALIZADO — sigue al puntero con glow y reacciona al hover
     ------------------------------------------------------------------------ */
  const cursor = document.getElementById('customCursor');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (cursor && isFinePointer) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Suaviza el movimiento del cursor con interpolación (lerp)
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    };
    cursor.style.opacity = '0';
    requestAnimationFrame(animateCursor);

    document.addEventListener('mousedown', () => cursor.classList.add('is-active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-active'));

    const hoverTargets = document.querySelectorAll(
      'a, button, input, textarea, .navbar-toggler, .skill-item, .project-card'
    );
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ------------------------------------------------------------------------
     3. ANIMACIÓN DE BARRAS DE HABILIDADES AL ENTRAR EN VIEWPORT
     ------------------------------------------------------------------------ */
  const skillFills = document.querySelectorAll('.skill-fill');

  if ('IntersectionObserver' in window && skillFills.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    skillFills.forEach((fill) => skillObserver.observe(fill));
  } else {
    // Fallback: mostrar todas las barras si no hay soporte para IntersectionObserver
    skillFills.forEach((fill) => fill.classList.add('is-visible'));
  }

  // Scroll Reveal Animations (AOS)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------------
     4. AÑO ACTUAL EN EL FOOTER
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     5. CIERRE AUTOMÁTICO DEL MENÚ MÓVIL AL SELECCIONAR UN ENLACE
     ------------------------------------------------------------------------ */
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  if (navMenu && window.bootstrap) {
    const bsCollapse = new bootstrap.Collapse(navMenu, { toggle: false });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. LIGHTBOX PARA IMÁGENES DEL CARRUSEL
     ------------------------------------------------------------------------ */
  document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('.carousel-item img')) {
      const modalElement = document.getElementById('imageModal');
      const modalImage = document.getElementById('modalImage');
      if (modalElement && modalImage && typeof bootstrap !== 'undefined') {
        modalImage.src = e.target.src;
        modalImage.alt = e.target.alt;
        const bsModal = bootstrap.Modal.getOrCreateInstance(modalElement);
        bsModal.show();
      }
    }
  });

  /* ------------------------------------------------------------------------
     7. MULTILANGUAGE SUPPORT (ES / EN)
     ------------------------------------------------------------------------ */
  const langToggle = document.getElementById('langToggle');
  let currentLang = localStorage.getItem('themeLang') || 'es';

  const applyLanguage = (lang) => {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
      if (!el.hasAttribute('data-es')) {
        el.setAttribute('data-es', el.innerHTML);
      }
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });
    if (langToggle) {
      langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
    }
    
    // Cambiar enlace del CV
    const cvLink = document.getElementById('cvLink');
    if (cvLink) {
      cvLink.href = lang === 'en' ? './assets/docs/CV_CarlosZeta_EN.pdf' : './assets/docs/CV_CarlosZeta.pdf';
    }
  };

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      localStorage.setItem('themeLang', currentLang);
      applyLanguage(currentLang);
    });
    applyLanguage(currentLang);
  }

  /* ------------------------------------------------------------------------
     8. DARK / LIGHT THEME TOGGLE
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  let currentTheme = localStorage.getItem('siteTheme') || 'dark';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('siteTheme', currentTheme);
      applyTheme(currentTheme);
    });
    applyTheme(currentTheme);
  }

  /* ------------------------------------------------------------------------
     9. AJAX FORM SUBMISSION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  const contactSubmit = document.getElementById('contactSubmit');
  
  if (contactForm && contactStatus && contactSubmit) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const isEnglish = currentLang === 'en';
      contactSubmit.disabled = true;
      contactSubmit.innerHTML = isEnglish ? 'Sending...' : 'Enviando...';
      
      const data = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          contactStatus.style.display = 'block';
          contactStatus.className = 'mt-3 text-success font-weight-bold';
          contactStatus.innerHTML = isEnglish ? '<i class="bi bi-check-circle-fill"></i> Message sent successfully!' : '<i class="bi bi-check-circle-fill"></i> ¡Mensaje enviado exitosamente!';
          contactForm.reset();
        } else {
          throw new Error('Error de red');
        }
      } catch (error) {
        contactStatus.style.display = 'block';
        contactStatus.className = 'mt-3 text-danger font-weight-bold';
        contactStatus.innerHTML = isEnglish ? '<i class="bi bi-x-circle-fill"></i> Error sending message. Please try again.' : '<i class="bi bi-x-circle-fill"></i> Error al enviar el mensaje. Inténtalo de nuevo.';
      } finally {
        contactSubmit.disabled = false;
        contactSubmit.innerHTML = isEnglish ? 'Send message' : 'Enviar mensaje';
      }
    });
  }

});
