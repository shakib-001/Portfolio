// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Mobile nav toggle
// ============================================
const hamburger = document.getElementById('hamburger');
const tabs = document.getElementById('tabs');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  tabs.classList.toggle('open');
});

tabs.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    hamburger.classList.remove('open');
    tabs.classList.remove('open');
  });
});

// ============================================
// Active tab highlighting based on scroll position
// ============================================
const sections = document.querySelectorAll('main .section, .hero');
const tabLinks = document.querySelectorAll('.tab');

// Sliding color indicator — animates position + color to match the active tab
const tabIndicator = document.getElementById('tabIndicator');

function moveIndicator(activeTab) {
  if (!activeTab || !tabIndicator) return;
  const tabRect = activeTab.getBoundingClientRect();
  const navRect = tabs.getBoundingClientRect();
  const color = activeTab.dataset.color || '#E8B75E';
  const glow = activeTab.dataset.glow || 'rgba(232,183,94,0.5)';
  tabIndicator.style.width = `${tabRect.width}px`;
  tabIndicator.style.transform = `translateX(${tabRect.left - navRect.left + tabs.scrollLeft}px)`;
  tabIndicator.style.background = color;
  tabIndicator.style.borderColor = color;
  tabIndicator.style.setProperty('--tab-glow', glow);
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      tabLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
      moveIndicator(document.querySelector('.tab.active'));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => {
  if (section.id) sectionObserver.observe(section);
});

// Position the indicator once layout is ready, and keep it aligned on resize
window.addEventListener('load', () => moveIndicator(document.querySelector('.tab.active')));
window.addEventListener('resize', () => moveIndicator(document.querySelector('.tab.active')));

// ============================================
// Reveal-on-scroll animation
// ============================================
const revealTargets = document.querySelectorAll(
  '.about__copy, .about__stats .stat, .skill-card, .timeline__item, .project-card, .contact-card, .section__tag, .section__title'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), index % 6 * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// Sticky tabbar shadow on scroll
// ============================================
const tabbar = document.getElementById('tabbar');
window.addEventListener('scroll', () => {
  tabbar.style.boxShadow = window.scrollY > 10 ? '0 8px 24px rgba(0,0,0,0.25)' : 'none';
});

// ============================================
// Back-to-top button
// ============================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
