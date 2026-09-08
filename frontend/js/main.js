// Preloader
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hide'), 500);
});

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const navlinks = document.getElementById('navlinks');
toggle.addEventListener('click', () => navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

// Reactive nav indicator + active link on scroll — positioned relative to nav-inner, not the <ul>
const links = Array.from(document.querySelectorAll('.nav-link'));
const indicator = document.getElementById('nav-indicator');
const navInner = document.querySelector('.nav-inner');
const sections = links.map(l => document.querySelector(l.getAttribute('href')));

function moveIndicator(link){
  if(!link || window.innerWidth <= 920){ indicator.style.opacity = '0'; return; }
  const linkBox = link.getBoundingClientRect();
  const innerBox = navInner.getBoundingClientRect();
  indicator.style.left = (linkBox.left - innerBox.left) + 'px';
  indicator.style.width = linkBox.width + 'px';
  indicator.style.opacity = '1';
}

let activeLink = links[0];
function setActive(){
  let current = sections[0];
  const scrollPos = window.scrollY + 130;
  sections.forEach((sec) => {
    if(sec && sec.offsetTop <= scrollPos) current = sec;
  });
  const idx = sections.indexOf(current);
  if(idx > -1){
    links.forEach(l => l.classList.remove('active'));
    links[idx].classList.add('active');
    activeLink = links[idx];
    moveIndicator(activeLink);
  }
}
window.addEventListener('scroll', setActive, {passive:true});
window.addEventListener('resize', () => moveIndicator(activeLink));
window.addEventListener('load', setActive);
if(document.fonts && document.fonts.ready){ document.fonts.ready.then(() => moveIndicator(activeLink)); }
setActive();

// Flow stage reveal
const flowSection = document.getElementById('flow-stages');
const flowFill = document.getElementById('flow-fill');
const flowPulse = document.getElementById('flow-pulse');
const stages = document.querySelectorAll('.flow-stage');
let flowDone = false;
const flowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting && !flowDone){
      flowDone = true;
      flowFill.style.width = '100%';
      stages.forEach((s, i) => setTimeout(() => s.classList.add('lit'), 300 + i * 500));
      setTimeout(() => flowPulse.classList.add('run'), 1900);
    }
  });
}, {threshold:0.4});
flowObserver.observe(flowSection);

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
fadeEls.forEach(el => fadeObserver.observe(el));

// Count-up numbers (gauge/odometer style)
const counters = document.querySelectorAll('[data-count]');
function animateCount(el){
  const target = parseInt(el.getAttribute('data-count'), 10);
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const pad = el.getAttribute('data-pad');
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    let val = Math.round(target * eased);
    let valStr = pad ? String(val).padStart(parseInt(pad,10), '0') : val.toLocaleString('en-IN');
    el.textContent = prefix + valStr + suffix;
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.6});
counters.forEach(c => countObserver.observe(c));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});


// Register button -> Google Form link.
// TODO: once your Google Form is ready, put its URL here (or directly in the
// href="#" on the #register-link button in index.html — either works).
const GOOGLE_FORM_URL = ''; // e.g. 'https://forms.gle/xxxxxxxxxxxx'

const registerLink = document.getElementById('register-link');
if (registerLink && GOOGLE_FORM_URL) {
  registerLink.href = GOOGLE_FORM_URL;
} else if (registerLink) {
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Registration link is not set up yet — add your Google Form URL in js/main.js (GOOGLE_FORM_URL) or as the href on #register-link.');
  });
}

// Theme details modal
// Edit the text below to customize each theme's description, and drop a
// matching image into assets/images/themes/ (named as shown) to replace the
// placeholder box.
const THEME_DETAILS = {
  '01': {
    title: 'Agritech And Rural Innovation',
    image: 'assets/images/themes/theme-01.jpg',
    description: 'Build mechanical or product solutions that improve farming, food processing, or rural livelihoods — from low-cost tools to smarter agricultural machinery.',
    points: [
      'Statement 1 — Design a modular agricultural machine that can adjust its tool depth/position according to soil condition and crop spacing.',
      'Statement 2 — Develop a small ground robot that identifies crop rows and mechanically removes weeds without disturbing crops..',
      'Statement 3 — Create a mechanism that maintains uniform seed spacing and depth for different seed sizes..',
      'Statement 4 — Design a compact machine that converts loose agricultural residue into dense transportable blocks..',
      'Statement 5 — Develop a tillage mechanism whose working depth/angle changes according to measured soil resistance..',
      'Statement 6 — Design a manually/semi-automatically operated harvesting mechanism that minimizes crop damage..',
      'Statement 7 — Develop a solar dryer with mechanically adjustable airflow for different agricultural products..',
      'Statement 8 — Create a system where soil conditions automatically control mechanical water flow to individual crop zones..',
      'Statement 9 — Develop a modular hand-pushed platform capable of carrying interchangeable agricultural tools..',
      'Statement 10 — Design a compact mechanical system for separating impurities from harvested grains..'
    ]
  },
  '02': {
    title: 'Drone Technology',
    image: 'assets/images/themes/theme-02.jpg',
    description: 'Design or improve a drone — its frame, propulsion, payload mechanism, or control system — for a real inspection, delivery, agriculture, or safety use case.',
    points: [
      'Statement1 — Develop a drone platform with a rapid mechanical payload-changing mechanism for delivery, inspection and sensing applications..',
      'Statement 2 — Develop a small UAV whose wing configuration can change between different flight conditions to improve efficiency..',
      'Statement 3 — Design adaptive landing gear capable of absorbing landing shocks on uneven surfaces..',
      'Statement 4 — Develop a small variable-pitch propulsion mechanism that allows thrust adjustment without changing motor speed..',
      'Statement 5 — Develop a compliant mechanical attachment that allows a drone to safely contact a surface for inspection..',
      'Statement 6 — Design a reliable lightweight payload-release mechanism that can operate remotely..',
      'Statement 7 — Develop a mechanically foldable drone frame optimized for quick deployment and structural rigidity..',
      'Statement 8 — Drone + vision system that detects cracks/corrosion while maintaining stable inspection distance..',
      'Statement 9 — Design a lightweight protective mechanism for safe drone operation near structures..',
      'Statement 10 — Develop a shock-resistant mechanical payload container with controlled release..'
    ]
  },
  '03': {
    title: 'Industry 5.0',
    image: 'assets/images/themes/theme-03.jpg',
    description: 'Blend human-centered design with automation and smart systems — collaborative robots, adaptive manufacturing, or human-machine interfaces that put people back at the center.',
    points: [
      'Statement — replace with a real detail about this theme.',
      'Statement 2 — replace with a real detail about this theme.',
      'Statement 3 — replace with a real detail about this theme.',
      'Statement 4 — replace with a real detail about this theme.',
      'Statement 5 — replace with a real detail about this theme.',
      'Statement 6 — replace with a real detail about this theme.',
      'Statement 7 — replace with a real detail about this theme.',
      'Statement 8 — replace with a real detail about this theme.',
      'Statement 9 — replace with a real detail about this theme.',
      'Statement 10 — replace with a real detail about this theme.'
    ]
  },
  '04': {
    title: 'Smart Robotics And Automation',
    image: 'assets/images/themes/theme-04.jpg',
    description: 'Design a mechanism or control system that senses its environment and acts on it with little to no human input — arms, rovers, automated rigs, or anything in between.',
    points: [
      'Statement 1 — replace with a real detail about this theme.',
      'Statement 2 — replace with a real detail about this theme.',
      'Statement 3 — replace with a real detail about this theme.',
      'Statement 4 — replace with a real detail about this theme.',
      'Statement 5 — replace with a real detail about this theme.',
      'Statement 6 — replace with a real detail about this theme.',
      'Statement 7 — replace with a real detail about this theme.',
      'Statement 8 — replace with a real detail about this theme.',
      'Statement 9 — replace with a real detail about this theme.',
      'Statement 10 — replace with a real detail about this theme.'
    ]
  },
  '05': {
    title: 'Health Care And Assistive Technology With A.I.',
    image: 'assets/images/themes/theme-05.jpg',
    description: 'Build a mechanical or physical device — assistive, diagnostic, or rehabilitative — that uses sensors or A.I. to improve patient care or independence.',
    points: [
      'Statement 1 — replace with a real detail about this theme.',
      'Statement 2 — replace with a real detail about this theme.',
      'Statement 3 — replace with a real detail about this theme.',
      'Statement 4 — replace with a real detail about this theme.',
      'Statement 5 — replace with a real detail about this theme.',
      'Statement 6 — replace with a real detail about this theme.',
      'Statement 7 — replace with a real detail about this theme.',
      'Statement 8 — replace with a real detail about this theme.',
      'Statement 9 — replace with a real detail about this theme.',
      'Statement 10 — replace with a real detail about this theme.'
    ]
  },
  '06': {
    title: 'Renewable Energy And E.V\'s',
    image: 'assets/images/themes/theme-06.jpg',
    description: 'Create hardware for generating or storing renewable energy, or components that improve the range, safety, or efficiency of electric vehicles.',
    points: [
      'Statement 1 — replace with a real detail about this theme.',
      'Statement 2 — replace with a real detail about this theme.',
      'Statement 3 — replace with a real detail about this theme.',
      'Statement 4 — replace with a real detail about this theme.',
      'Statement 5 — replace with a real detail about this theme.',
      'Statement 6 — replace with a real detail about this theme.',
      'Statement 7 — replace with a real detail about this theme.',
      'Statement 8 — replace with a real detail about this theme.',
      'Statement 9 — replace with a real detail about this theme.',
      'Statement 10 — replace with a real detail about this theme.'
    ]
  },
  '07': {
    title: 'Sustainable Manufacturing And Waste Management',
    image: 'assets/images/themes/theme-07.jpg',
    description: 'Design a process, machine, or product that reduces waste, reuses materials, or makes manufacturing more sustainable end-to-end.',
    points: [
      'Statement 1 — replace with a real detail about this theme.',
      'Statement 2 — replace with a real detail about this theme.',
      'Statement 3 — replace with a real detail about this theme.',
      'Statement 4 — replace with a real detail about this theme.',
      'Statement 5 — replace with a real detail about this theme.',
      'Statement 6 — replace with a real detail about this theme.',
      'Statement 7 — replace with a real detail about this theme.',
      'Statement 8 — replace with a real detail about this theme.',
      'Statement 9 — replace with a real detail about this theme.',
      'Statement 10 — replace with a real detail about this theme.'
    ]
  },
  '08': {
    title: 'Smart Automation',
    image: 'assets/images/themes/theme-08.jpg',
    description: 'Automate a repetitive or manual process with sensors, actuators, or control logic — anywhere from a workshop floor to a household task.',
    points: [
      'Statement 1 — replace with a real detail about this theme.',
      'Statement 2 — replace with a real detail about this theme.',
      'Statement 3 — replace with a real detail about this theme.',
      'Statement 4 — replace with a real detail about this theme.',
      'Statement 5 — replace with a real detail about this theme.',
      'Statement 6 — replace with a real detail about this theme.',
      'Statement 7 — replace with a real detail about this theme.',
      'Statement 8 — replace with a real detail about this theme.',
      'Statement 9 — replace with a real detail about this theme.',
      'Statement 10 — replace with a real detail about this theme.'
    ]
  },
  '09': {
    title: 'Open Innovation',
    image: 'assets/images/themes/theme-09.jpg',
    description: 'Any real world problem worth solving that doesn\'t fit neatly into the other eight themes. Bring your own idea and make the case for it.',

  }
};

// Preload every theme photo as soon as the page loads. By the time someone
// actually opens a modal, the image is already in the browser's cache, so
// it appears instantly instead of needing to load (which is when the old
// photo would otherwise flash briefly).
Object.values(THEME_DETAILS).forEach((data) => {
  const preload = new Image();
  preload.src = data.image;
});

const themeModal = document.getElementById('theme-modal');
const modalImage = document.getElementById('modal-image');
const modalImageWrap = document.querySelector('.modal-image-wrap');
const modalNum = document.getElementById('modal-num');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPoints = document.getElementById('modal-points');
const modalClose = document.getElementById('modal-close');

function openThemeModal(id) {
  const data = THEME_DETAILS[id];
  if (!data || !themeModal) return;

  modalNum.textContent = 'THEME ' + id;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  modalImage.alt = data.title;

  // Render the bullet points list (cleared and rebuilt each time)
  modalPoints.innerHTML = '';
  (data.points || []).forEach((point) => {
    const li = document.createElement('li');
    li.textContent = point;
    modalPoints.appendChild(li);
  });

  // Hide whatever photo is currently showing right away, so the previous
  // theme's image can never be visible while the new one loads.
  modalImageWrap.classList.remove('missing');
  modalImage.classList.remove('loaded');

  // Load the new photo off-screen first, and only point the visible <img>
  // at it (and fade it in) once it's fully ready. This is what stops the
  // "flashes the old photo, then pops to the right one" glitch.
  const loader = new Image();
  loader.onload = () => {
    // Ignore a stale load if the user already clicked a different theme
    if (modalImage.dataset.pending !== data.image) return;
    modalImage.src = data.image;
    modalImage.classList.add('loaded');
  };
  loader.onerror = () => {
    if (modalImage.dataset.pending !== data.image) return;
    modalImageWrap.classList.add('missing');
  };
  modalImage.dataset.pending = data.image;
  loader.src = data.image;

  themeModal.classList.add('open');
  themeModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeThemeModal() {
  if (!themeModal) return;
  themeModal.classList.remove('open');
  themeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.theme-details-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.theme-card');
    openThemeModal(card.dataset.theme);
  });
});

if (modalClose) modalClose.addEventListener('click', closeThemeModal);
if (themeModal) {
  themeModal.addEventListener('click', (e) => {
    if (e.target === themeModal) closeThemeModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeThemeModal();
});

// Gallery lightbox — click a photo to view it full-size
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  if (!lightbox) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('missing')) return; // no photo to show yet
    const img = item.querySelector('img');
    openLightbox(img.src, img.alt);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
