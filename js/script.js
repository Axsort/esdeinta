/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hide'), 1400);
});

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  backTop.classList.toggle('show', y > 500);
});

/* ===== MOBILE MENU ===== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* ===== SCROLL REVEAL (Intersection Observer) ===== */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger para grupos de cards
      const delay = entry.target.dataset.area || entry.target.classList.contains('t-step') ? 0 : 0;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach((el, i) => {
  // micro-stagger automático entre hermanos cercanos
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});

/* ===== ANIMATED COUNTERS ===== */
const counters = document.querySelectorAll('.stat-num');
let countersDone = false;

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersDone) {
      countersDone = true;
      counters.forEach(counter => {
        const target = +counter.dataset.count;
        const duration = 1800;
        const start = performance.now();

        const update = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // easing easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          counter.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else counter.textContent = target;
        };
        requestAnimationFrame(update);
      });
    }
  });
}, { threshold: 0.5 });

if (counters.length) countObserver.observe(counters[0].closest('.hero-stats'));

/* ===== SKILL BARS (recruit) ===== */
const bars = document.querySelectorAll('.bar');
const barsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      barsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(bar => barsObserver.observe(bar));

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}` && !link.classList.contains('nav-cta')) {
      if (header.classList.contains('scrolled')) link.style.color = 'var(--blue)';
      else link.style.color = 'var(--gold)';
    }
  });
});

/* ===== BACK TO TOP ===== */
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const area = document.getElementById('area').value;
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !company || !email || !area || !message) {
    formMsg.textContent = 'Por favor completa todos los campos requeridos.';
    formMsg.className = 'form-msg err';
    return;
  }
  if (!emailRegex.test(email)) {
    formMsg.textContent = 'Ingresa un correo electrónico válido.';
    formMsg.className = 'form-msg err';
    return;
  }

  // Simulación de envío (aquí conectarías tu backend / API)
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    formMsg.textContent = `¡Gracias, ${name}! Un especialista te contactará en menos de 24 horas.`;
    formMsg.className = 'form-msg ok';
    form.reset();
    btn.textContent = original;
    btn.disabled = false;
  }, 1500);
});

/* ===== PARALLAX SUTIL EN HERO ===== */
const blobs = document.querySelectorAll('.blob');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  blobs.forEach((blob, i) => {
    const speed = (i + 1) * 12;
    blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

/* ===== FOOTER YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== SISTEMA DE MODALES ===== */
const modal = document.getElementById('modal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalList = document.getElementById('modalList');

// Contenido de cada servicio / sección
const modalData = {
  admin: {
    icon: '📊',
    title: 'Administración',
    text: 'Ordenamos la operación de tu empresa para que cada proceso fluya sin fricciones y tu equipo trabaje con claridad.',
    list: ['Diagnóstico y rediseño de procesos', 'Estructuras organizacionales eficientes', 'Indicadores y tableros de control (KPIs)', 'Optimización de costos operativos']
  },
  rrhh: {
    icon: '👥',
    title: 'Recursos Humanos',
    text: 'Cuidamos al activo más valioso de tu empresa: las personas. Atraemos, desarrollamos y retenemos al mejor talento.',
    list: ['Gestión y desarrollo del talento', 'Evaluación de clima y cultura laboral', 'Planes de capacitación a la medida', 'Estructuras de compensación y beneficios']
  },
  conta: {
    icon: '📈',
    title: 'Contabilidad',
    text: 'Mantenemos la salud financiera de tu negocio bajo control, con cumplimiento fiscal y estrategias de rentabilidad.',
    list: ['Contabilidad y estados financieros', 'Cumplimiento fiscal y normativo', 'Planeación y optimización fiscal', 'Análisis de rentabilidad y flujo de efectivo']
  },
  mkt: {
    icon: '🎯',
    title: 'Marketing',
    text: 'Posicionamos tu marca y construimos estrategias que generan demanda real y clientes que sí convierten.',
    list: ['Estrategia de marca y posicionamiento', 'Marketing digital y redes sociales', 'Generación y gestión de leads', 'Campañas con medición de resultados']
  },
  legal: {
    icon: '⚖️',
    title: 'Legal',
    text: 'Blindamos tu empresa jurídicamente para que operes con tranquilidad y sin riesgos innecesarios.',
    list: ['Elaboración y revisión de contratos', 'Cumplimiento normativo y regulatorio', 'Prevención y gestión de riesgos legales', 'Asesoría corporativa y laboral']
  },
  it: {
    icon: '💻',
    title: 'Informática',
    text: 'Impulsamos la transformación digital de tu organización con tecnología segura, escalable y a tu medida.',
    list: ['Sistemas y software a la medida', 'Ciberseguridad y protección de datos', 'Infraestructura y soporte tecnológico', 'Automatización de procesos']
  },
  recruit: {
    icon: '🧲',
    title: 'Reclutamiento de Personal',
    text: 'Encontramos al talento correcto que impulsará el crecimiento de tu organización con procesos rigurosos.',
    list: ['Headhunting de perfiles ejecutivos', 'Selección por competencias', 'Evaluación de match cultural', 'Onboarding e integración del talento']
  },
  commerce: {
    icon: '📦',
    title: 'Compra-venta de artículos manufacturados',
    text: 'Como complemento a nuestros servicios, comercializamos productos seleccionados para apoyar las necesidades operativas de tu negocio.',
    list: ['Productos manufacturados de calidad', 'Asesoría en la selección', 'Atención personalizada']
  }
};

function openModal(key) {
  const data = modalData[key];
  if (!data) return;
  modalIcon.textContent = data.icon;
  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modalList.innerHTML = data.list.map(item => `<li>${item}</li>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Click en tarjetas de servicio
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.area));
});

// Click en features de reclutamiento (abren el modal de reclutamiento)
document.querySelectorAll('.rf').forEach(rf => {
  rf.addEventListener('click', () => openModal('recruit'));
});

// Click en la sección de comercialización
const commerceInner = document.querySelector('.commerce-inner');
if (commerceInner) {
  commerceInner.addEventListener('click', (e) => {
    // evita doble disparo si clican el botón de "Más información"
    if (e.target.closest('.btn')) e.preventDefault();
    openModal('commerce');
  });
}

// Cerrar modal: botón X, overlay, o el CTA interno
modal.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeModal);
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});