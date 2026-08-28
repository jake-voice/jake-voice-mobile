/* JAKE VOICE · CHRONOS ARTISTRY — shared interactions (mobile-first) */

/* Mobile nav toggle (button → X, scroll lock, outside/Esc close) */
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if(!toggle || !links) return;

  function setOpen(open){
    links.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));

  // close after tapping any link inside the menu
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => setOpen(false)));

  // close on outside click
  document.addEventListener('click', (e) => {
    if(links.classList.contains('open') &&
       !links.contains(e.target) && !toggle.contains(e.target)){
      setOpen(false);
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && links.classList.contains('open')) setOpen(false);
  });

  // safety: release scroll lock if resized to desktop while open
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 861 && links.classList.contains('open')) setOpen(false);
  });
})();

/* Active nav link based on current page */
(function(){
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > a, .nav-links > .nav-item > a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const target = href.split('#')[0];
    if(target === file){
      a.classList.add('active');
    }
  });
})();

/* Scroll reveal */
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* Contact form → mailto (front-end only, no backend) */
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const budget = form.querySelector('#budget').value;
    const msg = form.querySelector('#message').value.trim();
    const subject = encodeURIComponent('设计委托咨询 · ' + (name || '客户'));
    const body = encodeURIComponent(
      `姓名：${name}\n邮箱：${email}\n预算档位：${budget}\n\n需求描述：\n${msg}`
    );
    window.location.href = `mailto:jake@chronos.art?subject=${subject}&body=${body}`;
    form.reset();
    const ok = document.getElementById('formOk');
    if(ok){ ok.style.display = 'block'; setTimeout(() => ok.style.display='none', 6000); }
  });
})();
