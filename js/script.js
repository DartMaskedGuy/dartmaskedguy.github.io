
/* ============================= LOADER ============================= */
window.addEventListener('load', () => {
  setTimeout(()=>{ document.getElementById('loader').classList.add('hide'); revealHero(); }, 900);
});

/* ============================= SCROLL PROGRESS ============================= */
const progressBar = document.getElementById('progressBar');
function updateProgress(){
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = pct + '%';
}
document.addEventListener('scroll', updateProgress, {passive:true});

/* ============================= NAV ACTIVE LINK + BACK TO TOP ============================= */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');
const backToTop = document.getElementById('backToTop');
document.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 140) current = sec.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  backToTop.classList.toggle('show', window.scrollY > 700);
}, {passive:true});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ============================= MOBILE MENU ============================= */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ============================= RESUME / FORM (no backend — graceful placeholders) ============================= */
// document.getElementById('downloadResume').addEventListener('click', (e) => {
//   e.preventDefault();
//   alert('Add your resume PDF and point this button at it — e.g. /resume.pdf');
// });
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'Message ready — connect this form to your email service or a form backend to send it.';
});

/* ============================= TYPEWRITER ============================= */
const roles = ['Flutter Developer.', 'Mobile Architect.', 'Fintech Engineer.', 'VR/AR Enthusiast.'];
const twEl = document.getElementById('typewriter');
let rIdx = 0, cIdx = 0, deleting = false;
function typeLoop(){
  const word = roles[rIdx];
  if(!deleting){
    cIdx++;
    twEl.textContent = word.slice(0, cIdx);
    if(cIdx === word.length){ deleting = true; setTimeout(typeLoop, 1500); return; }
  } else {
    cIdx--;
    twEl.textContent = word.slice(0, cIdx);
    if(cIdx === 0){ deleting = false; rIdx = (rIdx+1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

/* ============================= CURSOR GLOW ============================= */
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
window.addEventListener('mouseleave', () => glow.style.opacity = 0);
window.addEventListener('mouseenter', () => glow.style.opacity = 1);

/* ============================= MAGNETIC BUTTONS ============================= */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.18}px, ${y*0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

/* ============================= FLOATING BACKGROUND ICONS ============================= */
const iconLayer = document.getElementById('floatingIcons');
const iconGlyphs = ['</>', '{ }', 'flutter', 'dart', '</>', '{ }', 'flutter', '⌁', '</>', 'dart'];
const flutterMark = '⟲'; // simple abstract stand-ins keep things lightweight & dependency-free
for(let i=0;i<22;i++){
  const el = document.createElement('div');
  el.className = 'fi';
  const isWord = Math.random() > 0.6;
  el.textContent = iconGlyphs[Math.floor(Math.random()*iconGlyphs.length)];
  el.style.fontSize = (12 + Math.random()*22) + 'px';
  el.style.left = Math.random()*100 + '%';
  el.style.top = Math.random()*100 + '%';
  el.style.animationDuration = (10 + Math.random()*14) + 's';
  el.style.animationDelay = (Math.random()*-20) + 's';
  el.style.opacity = (0.04 + Math.random()*0.06).toFixed(2);
  iconLayer.appendChild(el);
}

/* ============================= PARTICLE CANVAS ============================= */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();
const COUNT = Math.min(90, Math.floor(window.innerWidth/16));
for(let i=0;i<COUNT;i++){
  particles.push({
    x:Math.random()*W, y:Math.random()*H,
    vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25,
    r:Math.random()*1.6+0.6
  });
}
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<particles.length;i++){
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = 'rgba(122,243,255,0.45)';
    ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q = particles[j];
      const dx = p.x-q.x, dy = p.y-q.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist < 130){
        ctx.beginPath();
        ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
        ctx.strokeStyle = 'rgba(2,86,155,' + (0.14*(1-dist/130)) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ============================= GSAP SCROLL REVEALS ============================= */
gsap.registerPlugin(ScrollTrigger);
function revealHero(){
  gsap.to('#hero .reveal', {opacity:1, y:0, duration:0.9, stagger:0.12, ease:'power3.out'});
}
document.querySelectorAll('section:not(#hero) .reveal').forEach(el => {
  gsap.to(el, {
    opacity:1, y:0, duration:0.8, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 85%' }
  });
});
gsap.utils.toArray('.skill-card, .proj-card, .highlight-card, .tl-item').forEach((el,i) => {
  gsap.fromTo(el, {opacity:0, y:24}, {
    opacity:1, y:0, duration:0.7, ease:'power3.out', delay:(i%4)*0.06,
    scrollTrigger:{ trigger:el, start:'top 90%' }
  });
});

/* ============================= PROJECT CARD TILT GLOW ============================= */
document.querySelectorAll('.proj-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left)/r.width - 0.5) * 8;
    const y = ((e.clientY - r.top)/r.height - 0.5) * -8;
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});
