(()=>{
  const root=document.documentElement;
  const themeButton=document.querySelector('.theme-toggle');
  const syncTheme=()=>{
    const dark=root.dataset.theme==='dark';
    if(themeButton){
      themeButton.textContent=dark?'Light':'Dark';
      themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
      themeButton.setAttribute('aria-pressed',String(dark));
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#1c1c1c':'#fffcf0');
  };
  syncTheme();
  themeButton?.addEventListener('click',()=>{
    const next=root.dataset.theme==='dark'?'light':'dark';
    root.dataset.theme=next;
    try{localStorage.setItem('ren-theme',next)}catch{}
    syncTheme();
  });
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
