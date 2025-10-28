// Toggle de tema claro/escuro com preferência persistida
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){ root.classList.add('light'); }
  btn && btn.addEventListener('click', ()=>{
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '☀' : '☾';
  });
  btn && (btn.textContent = root.classList.contains('light') ? '☀' : '☾');
})();

// Formulário de contato: abre e-mail e WhatsApp com a mensagem
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();
    const assunto = encodeURIComponent('Contato via site — Logisync');
    const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`);
    // Abre e-mail
    const mailto = `mailto:logisync.br@proton.me?subject=${assunto}&body=${corpo}`;
    window.open(mailto, '_blank');
    // Sugere WhatsApp
    const waMsg = encodeURIComponent(`Olá, sou ${nome}. ${mensagem}`);
    const whatsapp = `https://wa.me/5548999097083?text=${waMsg}`;
    setTimeout(()=>window.open(whatsapp,'_blank'), 400);
  });
})();