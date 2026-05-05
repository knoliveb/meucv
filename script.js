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
// 4. PARALLAX SCROLL ENGINE
// ============================================================
const avatar = document.getElementById('avatar');
const avatarFace = document.getElementById('avatarFace');
const avatarLabel = document.getElementById('avatarLabel');
const city = document.getElementById('city');
const clouds = document.getElementById('clouds');
const progressBar = document.getElementById('scrollProgress');

const journeyLabels = [
  { pct: 10, text: 'Sua jornada começa...' },
  { pct: 15, text: '2014 · Varejo em Goiânia' },
  { pct: 30, text: '2020 · Cartório & Segurança' },
  { pct: 45, text: '2021 · Engenharia & RH' },
  { pct: 60, text: '2022 · Recrutador & UFRA' },
  { pct: 75, text: '2023 · Assistente DP' },
  { pct: 90, text: '2026 · Novos horizontes!' },
];

function updateParallax(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct = docHeight > 0 ? scrollTop / docHeight : 0;

  // Progress bar
  progressBar.style.width = (scrollPct * 100) + '%';

  // Avatar position (10% to 90% of viewport width)
  const avatarX = 10 + scrollPct * 80;
  avatar.style.left = avatarX + '%';

  // Avatar label
  const label = journeyLabels.reverse().find(l => scrollPct * 100 >= l.pct);
  if(label) avatarLabel.textContent = label.text;
  journeyLabels.reverse(); // restore order

  // Avatar walking animation
  if(scrollPct > 0.01){
    avatarFace.classList.add('avatar-walk');
  } else {
    avatarFace.classList.remove('avatar-walk');
  }

  // City parallax (moves slowly)
  city.style.transform = `translateX(-${scrollPct * 30}%)`;

  // Clouds parallax (moves very slowly, opposite direction)
  clouds.style.transform = `translateX(${scrollPct * 15}%)`;

  // Show timeline markers
  document.querySelectorAll('.timeline-marker').forEach(tm => {
    const tmLeft = parseFloat(tm.style.left);
    if(scrollPct * 100 >= tmLeft - 5){
      tm.classList.add('visible');
    } else {
      tm.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

// ============================================================
// 5. TYPEWRITER EFFECT
// ============================================================
const typewriterTexts = [
  "Assistente de Departamento Pessoal e estudante de Engenharia de Produção. Construo a ponte entre <strong>gestão de pessoas</strong> e <strong>otimização de processos</strong>.",
  "Mais de 11 anos transformando rotinas em resultados. De Goiânia a Canaã dos Carajás, levo comigo a certeza de que processos bem feitos mudam vidas.",
  "Se tem Excel, VBA e uma xícara de café, eu resolvo. Se não tiver o café, resolvemos do mesmo jeito. ☕"
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
// 6. EASTER EGG — Click the dot
// ============================================================
const dotEl = document.querySelector('.hero-name em');
const funFacts = [
  "Já organizei processos de admissão para mais de 200 colaboradores em um único projeto!",
  "Falo 3 'idiomas' do trabalho: RH, Engenharia e Excel avançado.",
  "Sou o tipo de pessoa que cria planilha até pra lista de supermercado.",
  "Dei aula informal de Excel pros colegas da prefeitura. Virou tradição toda sexta.",
  "Sonho em um dia otimizar processos de uma multinacional. Até lá, otimizo o café da manhã.",
  "Já morei em 3 estados diferentes. Sempre carrego a mala leve e o currículo pesado."
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

// Wiggle animation
const wiggleStyle = document.createElement('style');
wiggleStyle.textContent = `
  @keyframes wiggle{
    0%,100%{ transform: rotate(0deg) scale(1.3) }
    25%{ transform: rotate(-15deg) scale(1.3) }
    75%{ transform: rotate(15deg) scale(1.3) }
  }
`;
document.head.appendChild(wiggleStyle);

// ============================================================
// 7. CONFETTI SYSTEM
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
  const colors = ['#E07040', '#F0F4FA', '#3B6CB5', '#60a5fa', '#26456E'];
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
  showToast('🎉', 'Você encontrou o botão secreto de confetti!');
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
// 8. CURIOSITY CARDS FLIP
// ============================================================
document.querySelectorAll('.curiosity-card').forEach(card => {
  card.addEventListener('click', () => {
    const wasRevealed = card.classList.contains('revealed');
    document.querySelectorAll('.curiosity-card').forEach(c => c.classList.remove('revealed'));
    if(!wasRevealed){
      card.classList.add('revealed');
      showToast('Curiosidade desbloqueada!', 'Você está cada vez mais perto de conhecer meu perfil completo.');
    }
  });
});

// ============================================================
// 9. TOAST NOTIFICATIONS
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

const entranceToasts = [
  { title: 'Bem-vindo!', msg: 'Esse CV é interativo. Explore, clique e descubra curiosidades!' },
  { title: 'Dica #1', msg: 'O avatar no chão caminha conforme você rola a página.' },
  { title: 'Dica #2', msg: 'Clique no ponto laranja após "Nathan" para easter eggs!' },
  { title: 'Dica #3', msg: 'Os cards de curiosidades viram ao clicar. Todos têm algo escondido!' }
];

setTimeout(() => {
  const t = entranceToasts[Math.floor(Math.random()*entranceToasts.length)];
  showToast(t.title, t.msg);
}, 2500);

let scrollToastShown = false;
window.addEventListener('scroll', () => {
  if(!scrollToastShown && window.scrollY > 600){
    scrollToastShown = true;
    setTimeout(() => {
      showToast('Gostando do que vê?', 'Continue explorando. Cada seção tem algo especial.');
    }, 800);
  }
}, { passive: true });

// ============================================================
// 10. SCROLL REVEAL
// ============================================================
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ============================================================
// 11. SKILL BARS
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
// 12. EXPAND CARDS
// ============================================================
document.querySelectorAll('.exp-card').forEach(card => {
  card.querySelector('.exp-head').addEventListener('click', () => card.classList.toggle('open'));
});

// ============================================================
// 13. BOTTOM NAV ACTIVE STATE
// ============================================================
const bottomNavLinks = document.querySelectorAll('.bottom-nav a');
const contentSections = document.querySelectorAll('section[id]');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const id = e.target.id;
      bottomNavLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

contentSections.forEach(s => sectionObs.observe(s));

// ============================================================
// 14. SECRET KEY COMBO (press K 3x)
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
      showToast('Easter egg ativado!', 'Você encontrou o combo secreto! 🎉');
    }
  }
});

// ============================================================
// 15. AVATAR SHOW LABEL ON HOVER
// ============================================================
let avatarHoverTimer;
avatar.addEventListener('mouseenter', () => {
  avatar.classList.add('show-label');
  clearTimeout(avatarHoverTimer);
});
avatar.addEventListener('mouseleave', () => {
  avatarHoverTimer = setTimeout(() => avatar.classList.remove('show-label'), 500);
});

console.log('%c👋 Olá, curioso!', 'font-size:20px; font-weight:bold; color:#E07040;');
console.log('%cDica: tecle K 3 vezes rápido para um easter egg.', 'color:#8EA3C0;');