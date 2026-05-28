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

  // Project data with real content, images, videos, github & videoDemo links
  const projectsData = {
    'lili-quest': {
      category: 'Experiencia Interactiva · UX/UI',
      title: 'Lili Quest',
      github: 'https://github.com/NicoDiazFk',
      videoDemo: 'https://www.youtube.com/watch?v=0kIXJgRrw4Y',
      sections: [
        {
          heading: 'El Proyecto',
          text: 'Lili Quest es una experiencia multimedia interactiva diseñada para el Museo Etnográfico y Arqueológico Lilí de la Universidad Autónoma de Occidente. El proyecto busca acercar al público a un silbato en forma de perro de la cultura Quimbaya, una pieza arqueológica que permanece resguardada por motivos de conservación y fragilidad.'
        },
        {
          heading: 'Mi Rol',
          text: 'Desde mi rol como UX/UI Designer y diseñador de experiencia, participó en la conceptualización de la interacción, el diseño de la interfaz y la construcción del recorrido del usuario. Mi enfoque estuvo en definir cómo el visitante entiende, activa, explora y completa la experiencia de forma clara, intuitiva y memorable.'
        },
        {
          heading: 'La Experiencia',
          text: 'La experiencia combina una réplica física, lector RFID, controles físicos, modelo 3D, narrativa audiovisual y dinámicas de trivia. A través de estos elementos, el usuario puede explorar digitalmente la pieza, comprender su valor cultural y reconocer la importancia de conservar el patrimonio sin manipular el objeto original.'
        },
        {
          heading: 'Diseño de Interacción Clave',
          text: 'Uno de los momentos clave del diseño es la ruptura simbólica del silbato dentro de la simulación. Esta acción convierte la fragilidad de la pieza en una experiencia comprensible para el usuario, quien luego debe reconstruirla respondiendo preguntas relacionadas con su historia y significado cultural.'
        }
      ],
      gallery: [
        { type: 'image', src: 'assets/lili1.png', alt: 'Lili Quest — Pantalla inicio' },
        { type: 'image', src: 'assets/lili2.png', alt: 'Lili Quest — Interfaz iniciar' },
        { type: 'image', src: 'assets/lili3.png', alt: 'Lili Quest — Exploración 3D del silbato' },
        { type: 'image', src: 'assets/lili4.png', alt: 'Lili Quest — Trivia cultural' },
        { type: 'image', src: 'assets/lili5.png', alt: 'Lili Quest — Diálogo de reinicio' }
      ],
      tags: ['UX/UI Design', 'Diseño de Experiencia', 'Interacción Física-Digital', 'Narrativa', 'RFID', 'Modelo 3D', 'Trivia', 'Patrimonio Cultural']
    },
    'ubikasa': {
      category: 'Diseño UX/UI · Plataforma Web',
      title: 'Ubikasa',
      github: 'https://github.com/NicoDiazFk',
      videoDemo: null, // No video demo link
      sections: [
        {
          heading: 'El Proyecto',
          text: 'Ubikasa es una plataforma digital orientada a la gestión de arriendos y visitas a propiedades. El proyecto se centró en crear una experiencia de búsqueda de inmuebles intuitiva y visualmente atractiva, conectando a arrendadores, arrendatarios y visitantes interesados en agendar recorridos.'
        },
        {
          heading: 'Mi Rol — UX/UI Designer',
          text: 'Mi rol inició desde la fase de investigación, donde se analizaron las necesidades de los usuarios involucrados en el sistema. A partir de este entendimiento, se definieron flujos clave de interacción, puntos de contacto y requerimientos funcionales para una experiencia clara, útil y fácil de usar.'
        },
        {
          heading: 'Diseño Visual y de Marca',
          text: 'Participé en el diseño de marca y línea visual, trabajando elementos como identidad gráfica, estilo de interfaz, jerarquías visuales, componentes, tipografías y organización de pantallas. El objetivo fue construir una propuesta visual coherente, moderna, confiable y orientada a la facilidad de uso.'
        },
        {
          heading: 'Diseño de Interfaz',
          text: 'Diseñé interfaces enfocadas en facilitar procesos como la visualización de propiedades, la selección de fechas disponibles, la elección de horarios de visita y la confirmación de agendamientos. Se plantearon pantallas funcionales con componentes como calendario, selector de horarios, resumen de propiedad y mensajes de confirmación.'
        },
        {
          heading: 'Arquitectura Técnica',
          text: 'El proyecto culminó con la entrega de un prototipo funcional basado en microservicios, donde la experiencia diseñada se conectaba con una arquitectura distribuida. Esta estructura permitió separar responsabilidades del sistema en distintos servicios, facilitando la escalabilidad y mantenimiento del producto.'
        }
      ],
      gallery: [
        { type: 'image', src: 'assets/ubi1.png', alt: 'Ubikasa — Homepage y búsqueda' },
        { type: 'image', src: 'assets/ubi2.png', alt: 'Ubikasa — Catálogo con filtros y mapa' },
        { type: 'image', src: 'assets/ubi3.png', alt: 'Ubikasa — Detalle de propiedad' },
        { type: 'image', src: 'assets/ubi4.png', alt: 'Ubikasa — Inicio de sesión' },
        { type: 'image', src: 'assets/ubi5.png', alt: 'Ubikasa — Panel de usuario y favoritos' },
        { type: 'image', src: 'assets/ubi6.png', alt: 'Ubikasa — Vista arrendador' }
      ],
      tags: ['UX Research', 'UI Design', 'Diseño de Marca', 'Figma', 'Arquitectura de Información', 'Microservicios', 'Prototipado', 'User Flows']
    },
    '4p-brands': {
      category: 'Diseño UX/UI · Desarrollo Flutter',
      title: 'Aplicativo de Registro — 4P Brands',
      github: 'https://github.com/NicoDiazFk',
      videoDemo: 'https://youtube.com/shorts/qTkBKtuJzxY',
      sections: [
        {
          heading: 'El Proyecto',
          text: 'Este proyecto consistió en el diseño y desarrollo de un aplicativo de registro orientado a optimizar la captura de información de usuarios en experiencias, eventos o activaciones de marca. La solución fue pensada para reemplazar procesos manuales o poco eficientes, permitiendo registrar datos de manera más rápida, clara y organizada desde una interfaz sencilla y funcional.'
        },
        {
          heading: 'Mi Rol UX/UI',
          text: 'Mi rol se centró principalmente en el diseño de la experiencia de usuario y la interfaz, definiendo la estructura del formulario, la jerarquía visual de los campos, los flujos de interacción y la claridad del proceso de registro. Se buscó que la experiencia fuera directa, evitando fricción para el usuario final y facilitando que el equipo pudiera recolectar información de forma confiable durante el uso real del aplicativo.'
        },
        {
          heading: 'Componente UI y Validación',
          text: 'Desde el componente UI, trabajé en una interfaz limpia, ordenanda y adaptable al contexto de uso, priorizando la legibilidad, la disposición lógica de los campos y la facilidad para completar el registro. Además, se contemplaron validaciones importantes para mejorar la calidad de los datos, como campos obligatorios y restricciones para evitar información duplicada.'
        },
        {
          heading: 'Implementación Técnica (Flutter)',
          text: 'Aunque el enfoque principal fue UX/UI, también participé en la implementación técnica del proyecto utilizando Flutter, integrando la interfaz con la lógica de registro y almacenamiento local de datos. Esto permitió conectar las decisiones de diseño con una solución funcional, demostrando una visión integral entre experiencia, interfaz y desarrollo.'
        },
        {
          heading: 'El Resultado',
          text: 'El resultado fue una herramienta práctica para apoyar procesos de registro en contextos de marca, combinando diseño centrado en el usuario, estructura visual clara y funcionalidad técnica para mejorar la eficiencia del proceso.'
        }
      ],
      gallery: [
        { type: 'video', src: 'assets/VIDEO 4P 1.mp4', alt: 'Aplicativo de Registro — Video Demo' }
      ],
      tags: ['UX/UI Design', 'Figma', 'Flutter', 'Captura de Datos', 'Validación de Campos', 'Experiencia de Marca', 'Desarrollo Frontend']
    }
  };

  let currentSlide = 0;
  let slidesCount = 0;

  function initCarousel() {
    const container = document.querySelector('.modal__carousel-container');
    if (!container) return;

    const track = container.querySelector('.modal__carousel-track');
    const slides = container.querySelectorAll('.modal__carousel-slide');
    const dots = container.querySelectorAll('.modal__carousel-dot');
    const prevBtn = container.querySelector('.modal__carousel-btn--prev');
    const nextBtn = container.querySelector('.modal__carousel-btn--next');

    slidesCount = slides.length;
    currentSlide = 0;

    if (slidesCount <= 1) return;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      // Update active slides
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
        // Pause videos on inactive slides
        const video = slide.querySelector('video');
        if (video) {
          if (idx === currentSlide) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      });
      // Update active dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
      updateCarousel();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide + 1) % slidesCount;
      updateCarousel();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSlide = parseInt(dot.dataset.slide);
        updateCarousel();
      });
    });
  }

  function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    // Build sections HTML
    let sectionsHTML = project.sections.map(s =>
      `<h4 class="modal__section-title">${s.heading}</h4>
       <p class="modal__text">${s.text}</p>`
    ).join('');

    // Build carousel HTML
    let carouselHTML = '';
    if (project.gallery && project.gallery.length > 0) {
      const slidesHTML = project.gallery.map((item, idx) => `
        <div class="modal__carousel-slide ${idx === 0 ? 'active' : ''}">
          ${item.type === 'video'
            ? `<video src="${item.src}" autoplay loop muted playsinline controls class="modal__carousel-media"></video>`
            : `<img src="${item.src}" alt="${item.alt}" class="modal__carousel-media">`
          }
        </div>
      `).join('');

      const navHTML = project.gallery.length > 1 ? `
        <button class="modal__carousel-btn modal__carousel-btn--prev" aria-label="Anterior">‹</button>
        <button class="modal__carousel-btn modal__carousel-btn--next" aria-label="Siguiente">›</button>
        <div class="modal__carousel-dots">
          ${project.gallery.map((_, idx) => `
            <span class="modal__carousel-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}"></span>
          `).join('')}
        </div>
      ` : '';

      carouselHTML = `
        <div class="modal__carousel-container">
          <div class="modal__carousel-track">
            ${slidesHTML}
          </div>
          ${navHTML}
        </div>
      `;
    }

    // Build action buttons HTML (GitHub and Video Demo)
    let buttonsHTML = '';
    if (project.github || project.videoDemo) {
      buttonsHTML = `<div class="modal__actions">`;
      if (project.github) {
        buttonsHTML += `
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn--glass btn--sm modal__action-btn">
            <svg class="modal__btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
          </a>
        `;
      }
      if (project.videoDemo) {
        buttonsHTML += `
          <a href="${project.videoDemo}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm modal__action-btn">
            <svg class="modal__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Video Demo
          </a>
        `;
      }
      buttonsHTML += `</div>`;
    }

    // Build tags HTML
    let tagsHTML = project.tags.map(t =>
      `<span class="project-card__tag">${t}</span>`
    ).join('');

    modalBody.innerHTML = `
      ${carouselHTML}
      <span class="modal__category">${project.category}</span>
      <h3 class="modal__title">${project.title}</h3>
      ${buttonsHTML}
      <div class="modal__details-content">
        ${sectionsHTML}
      </div>
      <div class="modal__tags">${tagsHTML}</div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Initialize the carousel logic
    initCarousel();

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-visible');
      });
    });
  }

  function closeModal() {
    modal.classList.remove('is-visible');
    // Pause any playing video in modal carousel
    const videos = modalBody.querySelectorAll('video');
    videos.forEach(v => v.pause());

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

  // Keyboard navigation (Escape to close, Arrows for carousel)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      const nextBtn = modal.querySelector('.modal__carousel-btn--next');
      if (nextBtn) nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      const prevBtn = modal.querySelector('.modal__carousel-btn--prev');
      if (prevBtn) prevBtn.click();
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
