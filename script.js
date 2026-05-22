const cursorRing = document.querySelector('.cursor-ring');
const cursorDot = document.querySelector('.cursor-dot');

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

if (cursorRing && cursorDot && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  document
    .querySelectorAll('a, button, .project-card, .skill-box, .campus-card, .stat, .mode-panel, .gallery-card, .favorite-card, .hover-card')
    .forEach((element) => {
      element.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
      element.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
    });
}

/* Fade-in animation */

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((element) => observer.observe(element));

/* Technical / Campus lens switch */

const modeButtons = document.querySelectorAll('.mode-btn');
const modeTitle = document.getElementById('modeTitle');
const modeText = document.getElementById('modeText');
const lensSections = document.querySelectorAll('.lens-section');

const modeContent = {
  technical: {
    title: 'Technical Lens',
    text: 'Projects, AI systems, RAG pipelines, NLP workflows, backend APIs, data cleaning, model evaluation, and technical research work.'
  },
  campus: {
    title: 'Campus Lens',
    text: 'Campus participation, event operations, student communication, check-ins, outreach, volunteer coordination, and community-building at ASU.'
  }
};

function setLens(mode) {
  document.body.dataset.lens = mode;

  modeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });

  if (modeTitle && modeText && modeContent[mode]) {
    modeTitle.textContent = modeContent[mode].title;
    modeText.textContent = modeContent[mode].text;
  }

  lensSections.forEach((section) => {
    section.classList.toggle('active-lens', section.dataset.section === mode);
  });

  const activeSection = document.querySelector(`.lens-section[data-section="${mode}"]`);

  if (activeSection) {
    setTimeout(() => {
      activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 90);
  }
}

if (modeButtons.length) {
  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setLens(button.dataset.mode);
    });
  });
}

/* Light / Dark theme switch */

const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  document.body.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? 'light' : 'dark';
  }

  localStorage.setItem('portfolioTheme', theme);
}

const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}