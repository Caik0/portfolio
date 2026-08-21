// =========================================================
// 1. TEMA CLARO / ESCURO
// =========================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'light' ? '◑' : '◐';
  localStorage.setItem('portfolio-theme', theme);
}

// Recupera preferência salva ou usa a do sistema operacional
const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(savedTheme || (systemPrefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// =========================================================
// 2. MENU RESPONSIVO (burger)
// =========================================================
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

navBurger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navBurger.setAttribute('aria-expanded', isOpen);
});

// Fecha o menu ao clicar em um link (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// 3. DESTACA O LINK DA SEÇÃO ATIVA NO SCROLL
// =========================================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// =========================================================
// 4. FILTRO DE PROJETOS
// =========================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

// =========================================================
// 5. "CONSOLE" ANIMADO NO HERO
// =========================================================
const consoleBody = document.getElementById('consoleBody');
const consoleLines = [
  '> compilando perfil...',
  '> carregando habilidades... OK',
  '> testando projetos... 3 passed',
  '> status: disponível para novas oportunidades'
];

let lineIndex = 0;
let charIndex = 0;

function typeConsole() {
  if (lineIndex >= consoleLines.length) return;

  const currentLine = consoleLines[lineIndex];

  if (charIndex <= currentLine.length) {
    consoleBody.textContent = consoleLines.slice(0, lineIndex).join('\n') +
      (lineIndex > 0 ? '\n' : '') + currentLine.slice(0, charIndex);
    charIndex++;
    setTimeout(typeConsole, 22);
  } else {
    lineIndex++;
    charIndex = 0;
    setTimeout(typeConsole, 350);
  }
}

typeConsole();

// =========================================================
// 6. BOTÃO VOLTAR AO TOPO
// =========================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================================
// 7. FORMULÁRIO DE CONTATO (validação simples, sem envio real)
// =========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = '✗ preencha todos os campos corretamente.';
    formStatus.style.color = 'var(--del)';
    return;
  }

  formStatus.textContent = '✓ mensagem pronta para envio (conecte a um serviço real de e-mail/formulário para publicar).';
  formStatus.style.color = 'var(--add)';
  contactForm.reset();
});

// =========================================================
// 8. ANO ATUAL NO RODAPÉ
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();
