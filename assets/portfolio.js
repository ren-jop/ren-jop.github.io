
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(2,'0');
  const frameURL = n => '/assets/frames/frame-' + pad(n) + '.svg';
  document.querySelectorAll('.frame-story').forEach(story => {
    const img = story.querySelector('.frame-image'); if (!img) return;
    const start = Math.max(1, Number(story.dataset.frameStart || 1));
    const end = Math.min(30, Number(story.dataset.frameEnd || 30));
    const chapters = [...story.querySelectorAll('.frame-chapter')];
    const bar = story.querySelector('.frame-progress span');
    for(let i=start;i<=end;i++){const p=new Image();p.src=frameURL(i)}
    let current=-1;
    function render(){
      if(reduced){img.src=frameURL(start);chapters.forEach((e,i)=>e.classList.toggle('is-active',i===0));return}
      const rect=story.getBoundingClientRect();
      const scrollable=Math.max(1,story.offsetHeight-innerHeight);
      const progress=Math.max(0,Math.min(1,-rect.top/scrollable));
      const idx=Math.round(start+progress*(end-start));
      if(idx!==current){current=idx;img.src=frameURL(idx)}
      if(bar)bar.style.width=(progress*100).toFixed(2)+'%';
      chapters.forEach(el=>{const min=Number(el.dataset.frameMin||start),max=Number(el.dataset.frameMax||end);el.classList.toggle('is-active',idx>=min&&idx<=max)})
    }
    render();addEventListener('scroll',render,{passive:true});addEventListener('resize',render)
  });
  const header=document.querySelector('.site-header');
  const head=()=>header?.classList.toggle('is-scrolled',scrollY>24);head();addEventListener('scroll',head,{passive:true});
  const burger=document.querySelector('.burger'),nav=document.querySelector('.site-nav');
  function close(){document.body.classList.remove('menu-open');if(burger){burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open menu')}}
  burger?.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Close menu':'Open menu')});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  matchMedia('(min-width:901px)').addEventListener?.('change',e=>{if(e.matches)close()});
  const flow=[...document.querySelectorAll('.flow-step')];
  if('IntersectionObserver'in window&&!reduced){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.35});flow.forEach(x=>o.observe(x))}else flow.forEach(x=>x.classList.add('is-visible'));
})();
