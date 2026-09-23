(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(3,'0');
  const frameURL = n => '/assets/sequence/frame-' + pad(n) + '.svg';
  const cache = new Set();

  function preload(n){
    if(n < 1 || n > 180 || cache.has(n)) return;
    cache.add(n);
    const image = new Image();
    image.decoding = 'async';
    image.src = frameURL(n);
  }

  document.querySelectorAll('.frame-story').forEach(story => {
    let front = story.querySelector('.frame-image');
    if (!front) return;

    const back = front.cloneNode(false);
    back.classList.add('frame-buffer');
    front.after(back);

    const start = Math.max(1, Number(story.dataset.frameStart || 1));
    const end = Math.min(180, Number(story.dataset.frameEnd || 180));
    const chapters = [...story.querySelectorAll('.frame-chapter')];
    const bar = story.querySelector('.frame-progress span');
    const intro = story.querySelector('.hero-copy, .project-frame-copy');
    const fadeIntro = story.dataset.fadeIntro === 'true';

    for(let i=start;i<=Math.min(end,start+14);i++) preload(i);

    let displayed = start;
    let pending = start;
    let ticking = false;
    let token = 0;

    front.src = frameURL(start);

    function showFrame(target){
      target = Math.max(start, Math.min(end, target));
      if(target === displayed || target === pending) return;
      pending = target;
      const myToken = ++token;
      back.src = frameURL(target);
      const finish = () => {
        if(myToken !== token) return;
        back.style.opacity = '1';
        front.style.opacity = '0';
        const oldFront = front;
        front = back;
        back = oldFront;
        setTimeout(() => {
          if(myToken !== token) return;
          back.style.opacity = '0';
        }, 85);
        displayed = target;
      };
      if(back.complete) finish();
      else back.onload = finish;
    }

    function render(){
      ticking = false;
      if(reduced){
        front.src = frameURL(start);
        chapters.forEach((el,i)=>el.classList.toggle('is-active',i===0));
        return;
      }

      const rect = story.getBoundingClientRect();
      const scrollable = Math.max(1, story.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const floatFrame = start + progress * (end - start);
      const target = Math.round(floatFrame);

      showFrame(target);

      for(let i=target-7;i<=target+12;i++) preload(i);
      if(bar) bar.style.width = (progress * 100).toFixed(2) + '%';

      chapters.forEach(el => {
        const min = Number(el.dataset.frameMin || start);
        const max = Number(el.dataset.frameMax || end);
        el.classList.toggle('is-active', target >= min && target <= max);
      });

      if(intro && fadeIntro){
        const fade = Math.max(0, Math.min(1, 1 - progress / 0.115));
        intro.style.opacity = String(fade);
        intro.style.transform = intro.classList.contains('hero-copy')
          ? 'translateX(-50%) translateY(' + ((1-fade)*-18).toFixed(1) + 'px)'
          : 'translateY(' + ((1-fade)*-18).toFixed(1) + 'px)';
        intro.style.pointerEvents = fade < .15 ? 'none' : '';
      }
    }

    function requestRender(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(render);
    }

    render();
    addEventListener('scroll', requestRender, {passive:true});
    addEventListener('resize', requestRender);
  });

  const header=document.querySelector('.site-header');
  const updateHeader=()=>header?.classList.toggle('is-scrolled',scrollY>24);
  updateHeader();
  addEventListener('scroll',updateHeader,{passive:true});

  const burger=document.querySelector('.burger');
  const nav=document.querySelector('#site-nav');
  function closeMenu(){
    document.body.classList.remove('menu-open');
    if(burger){
      burger.setAttribute('aria-expanded','false');
      burger.setAttribute('aria-label','Open menu');
    }
  }
  burger?.addEventListener('click',()=>{
    const open=document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded',String(open));
    burger.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  matchMedia('(min-width:901px)').addEventListener?.('change',e=>{if(e.matches)closeMenu()});

  const flow=[...document.querySelectorAll('.flow-step')];
  if('IntersectionObserver' in window && !reduced){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('is-visible');
    }),{threshold:.35});
    flow.forEach(el=>observer.observe(el));
  } else {
    flow.forEach(el=>el.classList.add('is-visible'));
  }
})();