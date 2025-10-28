// Navegação mobile (hambúrguer)
(function(){
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(!navToggle || !navLinks) return;
  navToggle.addEventListener('click', ()=>{
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// Animações on-scroll (reveal)
(function(){
  const toReveal = [
    ...document.querySelectorAll('.section, .card, .hero h1, .hero .sub, .actions, .highlights')
  ];
  toReveal.forEach(el=>el.classList.add('reveal'));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('active'); io.unobserve(e.target); } });
  }, {threshold: 0.15});
  toReveal.forEach(el=>io.observe(el));
})();

// Ajuste de tema: respeitar preferência do sistema e aria-pressed
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if(saved ? saved === 'light' : prefersLight){ root.classList.add('light'); }
  if(btn){
    const isLight = root.classList.contains('light');
    btn.textContent = isLight ? '☀' : '☾';
    btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    btn.addEventListener('click', ()=>{
      const nowLight = root.classList.toggle('light');
      localStorage.setItem('theme', nowLight ? 'light' : 'dark');
      btn.textContent = nowLight ? '☀' : '☾';
      btn.setAttribute('aria-pressed', nowLight ? 'true' : 'false');
    });
  }
})();

// Tilt/parallax em cards e painéis
(function(){
  const items = document.querySelectorAll('.card, .panel');
  const strength = 12;
  items.forEach((el)=>{
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('pointermove', (e)=>{
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const rx = ((y/rect.height) - 0.5) * -strength;
      const ry = ((x/rect.width) - 0.5) * strength;
      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    el.addEventListener('pointerleave', ()=>{ el.style.transform = 'none'; });
  });
})();

// Parallax sutil no fundo tecnológico da hero
(function(){
  const bg = document.querySelector('.bg-tech');
  if(!bg) return;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY * 0.08;
    bg.style.transform = `translate3d(0, ${y}px, 0)`;
  });
})();

// Feedback do formulário: toast amigável após envio
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  function showToast(msg){
    let toast = document.querySelector('.toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(()=>{ toast.style.display = 'none'; }, 3000);
  }
  form.addEventListener('submit', ()=>{
    showToast('Obrigado! Vamos te responder em breve.');
  });
})();
// Revelação suave ao rolar para elementos com .reveal
(() => {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || targets.length === 0) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  targets.forEach(el => io.observe(el));
})();