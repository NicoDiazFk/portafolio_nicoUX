/* ============================================================
   PORTAFOLIO NICOLÁS DÍAZ GUERRERO
   JavaScript — Interactividad & Animaciones
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // HEADER SCROLL BEHAVIOR (Bubble effect)
  // ============================================================
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });


  // ============================================================
  // MOBILE MENU
  // ============================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open');
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove('is-open');
    }
  });


  // ============================================================
  // SMOOTH SCROLL (for anchor links)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ============================================================
  // INTERSECTION OBSERVER — Scroll Reveal Animations
  // ============================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });


  // ============================================================
  // SKILL BARS — Animate on scroll
  // ============================================================
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-bar__fill');
        if (fill) {
          const width = fill.style.getPropertyValue('--skill-width');
          fill.style.width = width;
        }
        entry.target.classList.add('is-visible');
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll('.skill-bar').forEach(bar => {
    skillObserver.observe(bar);
  });


  // ============================================================
  // PROJECT MODAL
  // ============================================================
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = modal.querySelector('.modal__backdrop');

  // Project data
  const projectsData = {
    'lili-quest': {
      image: 'assets/lili-quest.png',
      category: 'Experiencia Interactiva · UX/UI',
      title: 'Lili Quest',
      sections: [
        {
          heading: 'El Proyecto',
          text: 'Lili Quest es una experiencia interactiva diseñada para el Museo Etnográfico y Arqueológico Lilí, con el objetivo de acercar a los visitantes al patrimonio cultural mediante interfaces intuitivas, narrativa inmersiva, interacción física-digital y recursos lúdicos.'
        },
        {
          heading: 'Mi Rol',
          text: 'Participé desde la conceptualización de la experiencia hasta el diseño de la interfaz, los flujos de usuario y la forma en que las personas interactúan con el sistema. Mi enfoque fue crear una experiencia donde el diseño no se limita solo a la pantalla, sino que se convierte en una experiencia completa que combina lo físico y lo digital.'
        },
        {
          heading: 'Proceso de Diseño',
          text: 'Investigación de usuario → Definición de flujos de interacción → Wireframes → Prototipado de alta fidelidad → Pruebas de usabilidad → Iteración. Se trabajó con un enfoque centrado en el usuario, considerando diferentes perfiles de visitantes del museo.'
        }
      ],
      tags: ['UX Research', 'Diseño de Interfaz', 'Interacción Física-Digital', 'Narrativa Digital', 'Prototipado', 'Experiencia de Usuario']
    },
    'ubikasa': {
      image: 'assets/ubikasa.png',
      category: 'Diseño UX/UI · App',
      title: 'Ubikasa',
      sections: [
        {
          heading: 'El Proyecto',
          text: 'Ubikasa es una plataforma de búsqueda inmobiliaria diseñada para simplificar el proceso de encontrar vivienda. El proyecto se centró en crear una experiencia de búsqueda intuitiva y visualmente atractiva que conecte a los usuarios con su hogar ideal.'
        },
        {
          heading: 'Mi Rol',
          text: 'Lideré el diseño UX/UI del proyecto, desde la investigación de usuario y arquitectura de información hasta el prototipado de alta fidelidad. Me enfoqué en crear flujos claros y una interfaz que reduzca la fricción en el proceso de búsqueda inmobiliaria.'
        },
        {
          heading: 'Proceso de Diseño',
          text: 'Análisis competitivo → Entrevistas con usuarios → Arquitectura de información → Wireframes → Sistema de diseño → Prototipo interactivo → Validación con usuarios. Se priorizó la usabilidad y la accesibilidad en cada decisión de diseño.'
        }
      ],
      tags: ['UX Design', 'UI Design', 'Figma', 'Prototipado', 'Arquitectura de Información', 'User Research']
    }
  };

  function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    let sectionsHTML = project.sections.map(s =>
      `<h4 class="modal__section-title">${s.heading}</h4>
       <p class="modal__text">${s.text}</p>`
    ).join('');

    let tagsHTML = project.tags.map(t =>
      `<span class="project-card__tag">${t}</span>`
    ).join('');

    modalBody.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="modal__image"
           onerror="this.style.background='linear-gradient(135deg, #7c5cfc22, #38bdf822)'; this.style.height='300px'; this.alt='';">
      <span class="modal__category">${project.category}</span>
      <h3 class="modal__title">${project.title}</h3>
      ${sectionsHTML}
      <div class="modal__tags">${tagsHTML}</div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-visible');
      });
    });
  }

  function closeModal() {
    modal.classList.remove('is-visible');
    setTimeout(() => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      modalBody.innerHTML = '';
    }, 350);
  }

  // Click project cards to open modal
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      if (projectId) openModal(projectId);
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });


  // ============================================================
  // CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show success feedback
    formFeedback.textContent = '¡Gracias! Tu mensaje ha sido enviado. 🎉';
    formFeedback.className = 'form-feedback form-feedback--success';
    contactForm.reset();

    // Clear feedback after 5 seconds
    setTimeout(() => {
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';
    }, 5000);
  });


  // ============================================================
  // TOOL TAGS — Staggered entrance animation
  // ============================================================
  const toolsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.tool-tag');
        tags.forEach((tag, i) => {
          tag.style.opacity = '0';
          tag.style.transform = 'translateY(10px)';
          tag.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
          requestAnimationFrame(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          });
        });
        toolsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const toolsGrid = document.querySelector('.tools__grid');
  if (toolsGrid) toolsObserver.observe(toolsGrid);

});
