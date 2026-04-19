/* ===== NAVBAR SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== MOBILE MENU ===== */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===== MENU TABS ===== */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-grid').forEach(g => g.classList.remove('active'));

    tab.classList.add('active');
    const grid = document.getElementById('tab-' + target);
    if (grid) grid.classList.add('active');
  });
});

/* ===== RESERVATION FORM ===== */
const form = document.getElementById('reservationForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Confirmer la réservation';
      btn.disabled = false;
      formSuccess.style.display = 'block';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

/* ===== SCROLL ANIMATIONS ===== */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.menu-card, .contact-card, .gallery-item, .about-text, .about-images, .value-item, .reservation-text, .reservation-form'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--color-gold-light)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
