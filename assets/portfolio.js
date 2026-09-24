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
  const items=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },{threshold:.1});
    items.forEach(item=>observer.observe(item));
  }else{
    items.forEach(item=>item.classList.add('visible'));
  }
})();