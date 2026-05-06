// ============================================================
// 1. GENERATE STARS
// ============================================================
const starsContainer = document.getElementById('stars');
for(let i=0; i<80; i++){
  const star = document.createElement('div');
  star.className = 'star';
  star.style.cssText = `
    left:${Math.random()*100}%;
    top:${Math.random()*70}%;
    --dur:${2+Math.random()*4}s;
    --delay:${Math.random()*5}s;
    --max:${0.3+Math.random()*0.7};
  `;
  starsContainer.appendChild(star);
}

// ============================================================
// 2. GENERATE CLOUDS
// ============================================================
const cloudsContainer = document.getElementById('clouds');
for(let i=0; i<6; i++){
  const cloud = document.createElement('div');
  cloud.className = 'cloud';
  const w = 120+Math.random()*200;
  const h = 30+Math.random()*50;
  cloud.style.cssText = `
    width:${w}px; height:${h}px;
    left:${Math.random()*100}%;
    top:${5+Math.random()*30}%;
    opacity:${0.03+Math.random()*0.04};
  `;
  const b1 = document.createElement('div');
  b1.style.cssText = `width:${h*1.5}px;height:${h*1.5}px;left:${w*0.1}px;top:-${h*0.4}px;`;
  const b2 = document.createElement('div');
  b2.style.cssText = `width:${h}px;height:${h}px;left:${w*0.5}px;top:-${h*0.3}px;`;
  cloud.appendChild(b1);
  cloud.appendChild(b2);
  cloudsContainer.appendChild(cloud);
}

// ============================================================
// 3. GENERATE CITY SKYLINE
// ============================================================
const cityContainer = document.getElementById('city');
const buildingCount = 40;
for(let i=0; i<buildingCount; i++){
  const b = document.createElement('div');
  b.className = 'building' + (Math.random()>0.6 ? ' windows' : '');
  const w = 20+Math.random()*50;
  const h = 30+Math.random()*100;
  b.style.cssText = `width:${w}px;height:${h}%;`;
  cityContainer.appendChild(b);
}

// ============================================================
// 5. PARALLAX SCROLL ENGINE
// ============================================================
const city = document.getElementById('city');
const clouds = document.getElementById('clouds');
const progressBar = document.getElementById('scrollProgress');

function updateParallax(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct = docHeight > 0 ? scrollTop / docHeight : 0;

  // Progress bar global
  progressBar.style.width = (scrollPct * 100) + '%';

  // City parallax (moves slowly)
  city.style.transform = `translateX(-${scrollPct * 30}%)`;

  // Clouds parallax (moves very slowly, opposite direction)
  clouds.style.transform = `translateX(${scrollPct * 15}%)`;
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

// ============================================================
// 6. TYPEWRITER EFFECT
// ============================================================
const typewriterTexts = [
  "A empatia da<strong> gestao de pessoas </strong> de mãos dadas com a precisão da <strong> Engenharia de Produção</strong>.",
  "Carrego comigo a certeza de que processos bem feitos mudam vidas.",
  "Se tem Excel e uma xícara de café, eu resolvo. Se não tiver o café, resolvemos do mesmo jeito.☕"
];
let twIndex = 0, twChar = 0, twDeleting = false;
const twElement = document.getElementById('typewriterText');

function typewriterTick(){
  if(!twElement) return;
  const current = typewriterTexts[twIndex];
  if(twDeleting){
    twChar--;
    twElement.innerHTML = current.substring(0, twChar);
    if(twChar === 0){
      twDeleting = false;
      twIndex = (twIndex + 1) % typewriterTexts.length;
      setTimeout(typewriterTick, 600);
      return;
    }
    setTimeout(typewriterTick, 25);
  } else {
    twChar++;
    twElement.innerHTML = current.substring(0, twChar);
    if(twChar >= current.length){
      twDeleting = true;
      setTimeout(typewriterTick, 3500);
      return;
    }
    setTimeout(typewriterTick, 35 + Math.random() * 20);
  }
}
setTimeout(typewriterTick, 1200);

// ============================================================
// 7. EASTER EGG — Click the dot
// ============================================================
const dotEl = document.querySelector('.hero-name em');
const funFacts = [
  "Ja organizei processos de admissao para mais de 200 colaboradores em um unico projeto!",
  "Falo 3 'idiomas' do trabalho: RH, Engenharia e Excel avancado.",
  "Sou o tipo de pessoa que cria planilha ate pra lista de supermercado.",
  "Dei aula informal de Excel pros colegas da prefeitura. Virou tradicao toda sexta.",
  "Sonho em um dia otimizar processos de uma multinacional. Ate la, otimizo o cafe da manha.",
  "Ja morei em 3 estados diferentes. Sempre carrego a mala leve e o curriculo pesado."
];
let factIndex = 0;
const tipEl = document.getElementById('funFactTip');
const tipText = document.getElementById('funFactText');

if(dotEl && tipEl){
  dotEl.style.cursor = 'pointer';
  dotEl.addEventListener('click', (e) => {
    e.preventDefault();
    dotEl.style.display = 'inline-block';
    dotEl.style.animation = 'wiggle 0.6s ease';
    setTimeout(() => dotEl.style.animation = '', 600);

    tipText.textContent = funFacts[factIndex];
    factIndex = (factIndex + 1) % funFacts.length;

    const rect = dotEl.getBoundingClientRect();
    tipEl.style.left = (rect.left + rect.width/2 - 140) + 'px';
    tipEl.style.top = (rect.bottom + 12) + 'px';
    tipEl.classList.add('show');
    setTimeout(() => tipEl.classList.remove('show'), 4000);
  });
}

// ============================================================
// 8. CONFETTI SYSTEM
// ============================================================
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let confetti = [];

function resizeCanvas(){
  if(canvas){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function spawnConfetti(x, y, count=60){
  if(!ctx) return;
  // Read accent + theme-aware confetti colors from CSS vars so confetti
  // stays visible in both light and dark modes.
  const cs = getComputedStyle(document.documentElement);
  const v = (n, fallback) => (cs.getPropertyValue(n).trim() || fallback);
  const colors = [
    v('--accent', '#E07040'),
    v('--confetti-color-2', '#F0F4FA'),
    v('--confetti-color-3', '#3B6CB5'),
    v('--confetti-color-4', '#60a5fa'),
    v('--confetti-color-5', '#26456E')
  ];
  for(let i=0; i<count; i++){
    confetti.push({
      x: x, y: y,
      vx: (Math.random()-0.5)*12,
      vy: (Math.random()-1.2)*10,
      size: Math.random()*5+3,
      color: colors[Math.floor(Math.random()*colors.length)],
      rotation: Math.random()*360,
      rotationSpeed: (Math.random()-0.5)*10,
      gravity: 0.25,
      drag: 0.96,
      life: 1
    });
  }
  if(!confettiAnimating) animateConfetti();
}

function spawnConfettiCenter(){
  spawnConfetti(window.innerWidth/2, window.innerHeight/2, 120);
}

let confettiAnimating = false;
function animateConfetti(){
  if(!ctx || confetti.length===0){ confettiAnimating=false; return; }
  confettiAnimating = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    p.vy += p.gravity;
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.life -= 0.008;
    if(p.life > 0){
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI/180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
      ctx.restore();
    }
  });
  confetti = confetti.filter(p => p.life > 0);
  requestAnimationFrame(animateConfetti);
}

// ============================================================
// 9. CURIOSITY CARDS FLIP
// ============================================================
document.querySelectorAll('.curiosity-card').forEach(card => {
  card.addEventListener('click', () => {
    const wasRevealed = card.classList.contains('revealed');
    document.querySelectorAll('.curiosity-card').forEach(c => c.classList.remove('revealed'));
    if(!wasRevealed){
      card.classList.add('revealed');
    }
  });
});

// ============================================================
// 10. TOAST NOTIFICATIONS (available but not auto-triggered)
// ============================================================
const toastContainer = document.getElementById('toastContainer');
function showToast(title, message){
  if(!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<div class="toast-title">'+title+'</div><div>'+message+'</div>';
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// ============================================================
// 11. SCROLL REVEAL
// ============================================================
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ============================================================
// 12. SKILL BARS
// ============================================================
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-fill').forEach((f, i) => {
        setTimeout(() => { f.style.width = f.dataset.level+'%'; }, i*80);
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-group').forEach(g => skillObs.observe(g));

// ============================================================
// 13. EXPERIENCE — Horizontal scroll timeline com Avatar
// ============================================================
(function expHorizontalScroll(){
  const wrapper = document.getElementById('expScrollWrapper');
  const track = document.getElementById('expTrack');
  const railProgress = document.getElementById('railProgress');
  const railPlayhead = document.getElementById('railPlayhead');
  const railMarkers = document.getElementById('railMarkers');
  const counterNow = document.getElementById('cardCounterNow');
  const counterTotal = document.getElementById('cardCounterTotal');
  const avatar = document.getElementById('avatar');
  const avatarFace = document.getElementById('avatarFace');
  const avatarLabel = document.getElementById('avatarLabel');
  if (!wrapper || !track) return;

  // Labels do avatar baseados no card ativo
  const journeyLabels = [
    { idx: 0, text: '2025 · Assistente DP' },
    { idx: 1, text: '2023 · Recrutador' },
    { idx: 2, text: '2021 · Assistente Adm' },
    { idx: 3, text: '2020 · Escrevente' },
    { idx: 4, text: '2014 · Supply Chain' },
  ];

  let cards = Array.from(track.querySelectorAll('.exp-card'));
  let visibleCards = cards.slice();
  let horizontalDistance = 0;
  let isMobile = window.matchMedia('(max-width: 900px)').matches;
  let currentProgress = 0;

  function buildMarkers(){
    railMarkers.innerHTML = '';
    visibleCards.forEach((card, i) => {
      const m = document.createElement('div');
      m.className = 'rail-marker';
      m.dataset.idx = i;
      const year = card.dataset.year || '';
      m.innerHTML = `<span class="dot"></span><span class="label">${year}</span>`;
      const pct = visibleCards.length === 1 ? 0 : (i / (visibleCards.length - 1)) * 100;
      m.style.left = pct + '%';
      m.addEventListener('click', () => jumpToCard(i));
      railMarkers.appendChild(m);
    });
  }

  function jumpToCard(idx){
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top + window.scrollY;
    const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
    const target = visibleCards.length === 1 ? 0 : idx / (visibleCards.length - 1);
    const targetY = wrapperTop + (scrollableHeight * target);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  function measure(){
    isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) {
      wrapper.style.height = '';
      track.style.transform = '';
      return;
    }
    const trackWidth = track.scrollWidth;
    const viewport = window.innerWidth;
    horizontalDistance = Math.max(0, trackWidth - viewport);
    wrapper.style.height = (window.innerHeight + horizontalDistance) + 'px';
  }

  function update(){
    if (isMobile) return;
    const rect = wrapper.getBoundingClientRect();
    const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
    let progress = -rect.top / scrollableHeight;
    progress = Math.max(0, Math.min(1, progress));
    currentProgress = progress;

    // Move horizontal track
    track.style.transform = `translate3d(${-progress * horizontalDistance}px, 0, 0)`;

    // Update rail progress
    if (railProgress) railProgress.style.width = (progress * 100) + '%';
    if (railPlayhead) railPlayhead.style.left = (progress * 100) + '%';

    // Update avatar position dentro da rail (0% a 100%)
    if (avatar) avatar.style.left = (progress * 100) + '%';

    // Avatar walking animation - ativa quando esta na secao de experiencia
    if(avatarFace){
      if(progress > 0.01 && progress < 0.99){
        avatarFace.classList.add('avatar-walk');
      } else {
        avatarFace.classList.remove('avatar-walk');
      }
    }

    // Update avatar label baseado no card ativo
    if(avatarLabel){
      const viewportCenter = window.innerWidth / 2;
      let activeIdx = 0;
      let bestDist = Infinity;
      visibleCards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) { bestDist = dist; activeIdx = i; }
      });

      const label = journeyLabels.find(l => l.idx === activeIdx);
      if(label) avatarLabel.textContent = label.text;
    }

    // Determine active card
    const viewportCenter = window.innerWidth / 2;
    let activeIdx = 0;
    let bestDist = Infinity;
    visibleCards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const dist = Math.abs(center - viewportCenter);
      if (dist < bestDist) { bestDist = dist; activeIdx = i; }
    });

    visibleCards.forEach((card, i) => {
      card.classList.toggle('is-active', i === activeIdx);
    });
    const markers = railMarkers.querySelectorAll('.rail-marker');
    markers.forEach((m, i) => {
      m.classList.toggle('is-active', i === activeIdx);
      m.classList.toggle('passed', i < activeIdx);
    });
    if (counterNow) counterNow.textContent = String(activeIdx + 1).padStart(2, '0');
  }

  function applyFilter(filter){
    cards.forEach(c => {
      const match = (filter === 'all' || c.dataset.cat === filter);
      c.classList.toggle('hidden', !match);
    });
    visibleCards = cards.filter(c => !c.classList.contains('hidden'));
    visibleCards.forEach((card, i) => {
      const indexSpan = card.querySelector('.card-index');
      if (indexSpan) {
        const total = String(visibleCards.length).padStart(2, '0');
        indexSpan.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span> / ${total}`;
      }
    });
    if (counterTotal) counterTotal.textContent = String(visibleCards.length).padStart(2, '0');
    buildMarkers();
    const wrapperRect = wrapper.getBoundingClientRect();
    if (wrapperRect.top < 0 && wrapperRect.bottom > window.innerHeight) {
      const wrapperTop = wrapperRect.top + window.scrollY;
      window.scrollTo({ top: wrapperTop, behavior: 'auto' });
    }
    requestAnimationFrame(() => { measure(); update(); });
  }

  document.querySelectorAll('.filter-bar .filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-bar .filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  if (counterTotal) counterTotal.textContent = String(visibleCards.length).padStart(2, '0');
  buildMarkers();
  measure();
  update();

  let raf = null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { update(); raf = null; });
  }, { passive: true });

  let resizeRaf = null;
  window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => { measure(); update(); });
  });

  window.addEventListener('load', () => { measure(); update(); });

  // Avatar hover label
  if(avatar){
    let avatarHoverTimer;
    avatar.addEventListener('mouseenter', () => {
      avatar.classList.add('show-label');
      clearTimeout(avatarHoverTimer);
    });
    avatar.addEventListener('mouseleave', () => {
      avatarHoverTimer = setTimeout(() => avatar.classList.remove('show-label'), 500);
    });
  }
})();

// ============================================================
// 14. SIDE NAV ACTIVE STATE
// ============================================================
const sideNavLinks = document.querySelectorAll('.side-nav a');
const contentSections = document.querySelectorAll('section[id]');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const id = e.target.id;
      sideNavLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

contentSections.forEach(s => sectionObs.observe(s));

// ============================================================
// 15. SECRET KEY COMBO (press K 3x)
// ============================================================
let kPresses = 0, kTimeout;
document.addEventListener('keydown', (e) => {
  if(e.key === 'k' || e.key === 'K'){
    kPresses++;
    clearTimeout(kTimeout);
    kTimeout = setTimeout(() => kPresses = 0, 800);
    if(kPresses >= 3){
      kPresses = 0;
      spawnConfetti(window.innerWidth/2, window.innerHeight/2, 200);
    }
  }
});

// ============================================================
// 16. SECRET SECTION — Revealed after scrolling at the end
// ============================================================
let endScrollAttempts = 0;
let lastScrollY = 0;
let secretRevealed = false;
const secretSection = document.getElementById('secret');

function revealSecret(){
  if(secretRevealed || !secretSection) return;
  secretRevealed = true;

  // Show the section
  secretSection.style.display = 'block';
  secretSection.classList.add('revealed');

  // Animate the content card
  const card = secretSection.querySelector('.content-card');
  if(card){
    requestAnimationFrame(() => {
      card.classList.add('in');
    });
  }

  // Celebration confetti
  setTimeout(() => {
    spawnConfetti(window.innerWidth/2, window.innerHeight/2, 200);
  }, 300);

  // Also spawn confetti around the prize area after scroll
  setTimeout(() => {
    const prize = secretSection.querySelector('.secret-prize');
    if(prize){
      const rect = prize.getBoundingClientRect();
      if(rect.top >= 0 && rect.bottom <= window.innerHeight){
        spawnConfetti(rect.left + rect.width/2, rect.top + rect.height/2, 80);
      }
    }
  }, 1200);
}

window.addEventListener('scroll', () => {
  if(secretRevealed || !secretSection) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Only count if user is near the bottom (last 250px) and scrolling down
  if(scrollTop > docHeight - 250 && scrollTop > lastScrollY){
    endScrollAttempts++;
    if(endScrollAttempts >= 3){
      revealSecret();
    }
  }
  lastScrollY = scrollTop;
}, { passive: true });

console.log('%cOla, curioso!', 'font-size:20px; font-weight:bold; color:#E07040;');
console.log('%cDica: tecle K 3 vezes rapido para um easter egg.', 'color:#8EA3C0;');

// ============================================================
// 17. THEME TOGGLE (Light / Dark mode)
// ============================================================
(function themeToggleSetup(){
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  // Read whatever the head-script already applied (defaults to 'dark')
  function getCurrentTheme(){
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme){
    const next = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e) { /* storage may be blocked */ }
    if(toggleBtn){
      const label = next === 'light'
        ? 'Mudar para o modo escuro'
        : 'Mudar para o modo claro';
      toggleBtn.setAttribute('aria-label', label);
      toggleBtn.setAttribute('title', label);
      toggleBtn.setAttribute('aria-pressed', String(next === 'light'));
    }
  }

  // Ensure the button reflects the current theme on load
  applyTheme(getCurrentTheme());

  if(toggleBtn){
    toggleBtn.addEventListener('click', () => {
      // Click toggles the mode; another click returns to the previous state.
      const current = getCurrentTheme();
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }
})();
