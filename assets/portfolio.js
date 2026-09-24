(()=>{
  const toggle=document.querySelector('.mobile-toggle');
  toggle?.addEventListener('click',()=>{
    const open=document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded',String(open));
  });
  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
    document.body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded','false');
  }));
})();