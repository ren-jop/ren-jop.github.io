(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.appear').forEach(el => {
    el.addEventListener('animationend', () => el.classList.add('is-in'), {once:true});
  });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.appear').forEach(el => {
      const a = el.getAnimations ? el.getAnimations() : [];
      if (!a.some(x => x.playState === 'running' || x.playState === 'finished')) el.classList.add('is-in');
    });
  }));

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('#site-nav');
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    if (burger) { burger.setAttribute('aria-expanded','false'); burger.setAttribute('aria-label','Open menu'); }
  };
  burger?.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  matchMedia('(min-width:1101px)').addEventListener?.('change', e => { if (e.matches) closeMenu(); });

  if (!reduceMotion && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const field = document.querySelector('.hero-field svg');
    addEventListener('pointermove', e => {
      if (!field || scrollY > innerHeight) return;
      const x = (e.clientX / innerWidth - .5) * 10;
      const y = (e.clientY / innerHeight - .5) * 8;
      field.style.setProperty('--field-x', x.toFixed(1)+'px');
      field.style.setProperty('--field-y', y.toFixed(1)+'px');
    }, {passive:true});
  }

  const diagrams = {
    deadlock: {
      title:'Deadlock', href:'/deadlock/',
      description:'A root daemon, schedule logic and distraction policy working as one enforcement path.',
      svg:'<svg viewBox="0 0 640 360" role="img" aria-label="Deadlock architecture"><rect x="55" y="62" width="150" height="90" rx="14" fill="#0b0b0b" stroke="#8f8f8f"/><path d="M92 108a35 35 0 1 0 54-29 28 28 0 1 1-54 29Z" fill="#98b8df" opacity=".8"/><text x="130" y="181" text-anchor="middle" fill="#bdbdbd" font-size="14">schedule</text><path class="draw" d="M205 107H300" stroke="#98b8df" stroke-width="3" fill="none"/><rect class="pulse" x="300" y="58" width="150" height="98" rx="14" fill="#e8e8e8"/><text x="375" y="100" text-anchor="middle" fill="#111" font-size="18" font-weight="700">daemon</text><text x="375" y="124" text-anchor="middle" fill="#555" font-size="13">root enforcement</text><path class="draw" d="M450 107H545V219" stroke="#98b8df" stroke-width="3" fill="none"/><rect class="pulse" x="470" y="219" width="150" height="84" rx="14" fill="#090909" stroke="#8f8f8f"/><text x="545" y="254" text-anchor="middle" fill="#eee" font-size="16" font-weight="700">sleep + block</text><text x="545" y="277" text-anchor="middle" fill="#777" font-size="12">system response</text><path class="draw" d="M300 107H260V262H166" stroke="#555" stroke-width="2" fill="none"/><rect x="40" y="228" width="126" height="70" rx="14" fill="#090909" stroke="#555"/><text x="103" y="259" text-anchor="middle" fill="#ddd" font-size="14" font-weight="700">menu app</text><text x="103" y="279" text-anchor="middle" fill="#777" font-size="11">status / controls</text></svg>'
    },
    focus: {
      title:'Focus', href:'/focus/',
      description:'Countdown and count-up sessions, local history and a direct bridge into Deadlock.',
      svg:'<svg viewBox="0 0 640 360" role="img" aria-label="Focus timer architecture"><circle cx="205" cy="180" r="104" fill="#080808" stroke="#343434" stroke-width="20"/><circle class="draw" cx="205" cy="180" r="104" fill="none" stroke="#98b8df" stroke-width="20" stroke-linecap="round" pathLength="100" stroke-dasharray="72 100" transform="rotate(-90 205 180)"/><text x="205" y="171" text-anchor="middle" fill="#fff" font-size="45" font-weight="650">42:18</text><text x="205" y="204" text-anchor="middle" fill="#8eaacb" font-size="13">COUNT UP</text><path class="draw" d="M330 180H405" stroke="#98b8df" stroke-width="3"/><rect class="pulse" x="405" y="92" width="182" height="72" rx="14" fill="#e8e8e8"/><text x="496" y="124" text-anchor="middle" fill="#111" font-size="16" font-weight="700">session history</text><text x="496" y="145" text-anchor="middle" fill="#555" font-size="12">planned vs actual</text><rect class="pulse" x="405" y="199" width="182" height="72" rx="14" fill="#090909" stroke="#777"/><text x="496" y="230" text-anchor="middle" fill="#eee" font-size="16" font-weight="700">Deadlock IPC</text><text x="496" y="251" text-anchor="middle" fill="#777" font-size="12">protect the session</text></svg>'
    },
    planner: {
      title:'Planner', href:'/planner/',
      description:'Apple Calendar stays the source of truth while Planner turns schedule into execution and history.',
      svg:'<svg viewBox="0 0 640 360" role="img" aria-label="Planner architecture"><rect x="45" y="52" width="250" height="250" rx="18" fill="#080808" stroke="#777"/><path d="M45 108H295M108 108V302M171 108V302M234 108V302M45 171H295M45 234H295" stroke="#333"/><rect x="176" y="176" width="53" height="53" rx="8" fill="#98b8df" opacity=".85"/><rect x="239" y="113" width="51" height="53" rx="8" fill="#596f89"/><text x="170" y="86" text-anchor="middle" fill="#ddd" font-size="17" font-weight="650">Apple Calendar</text><path class="draw" d="M295 180H375" stroke="#98b8df" stroke-width="3"/><rect class="pulse" x="375" y="91" width="215" height="84" rx="14" fill="#e8e8e8"/><text x="482" y="126" text-anchor="middle" fill="#111" font-size="17" font-weight="700">Focus</text><text x="482" y="150" text-anchor="middle" fill="#555" font-size="12">start scheduled block</text><path class="draw" d="M482 175V214" stroke="#98b8df" stroke-width="3"/><rect class="pulse" x="375" y="214" width="215" height="84" rx="14" fill="#090909" stroke="#777"/><text x="482" y="249" text-anchor="middle" fill="#eee" font-size="17" font-weight="700">history</text><text x="482" y="273" text-anchor="middle" fill="#777" font-size="12">planned ↔ actual</text></svg>'
    },
    oxide: {
      title:'Oxide Keys', href:'/oxide-keys/',
      description:'A custom handheld where PCB layout, physical controls and embedded Rust firmware meet.',
      svg:'<svg viewBox="0 0 640 360" role="img" aria-label="Oxide Keys handheld"><rect x="82" y="42" width="476" height="276" rx="32" fill="#111" stroke="#777" stroke-width="2"/><rect x="202" y="70" width="236" height="92" rx="8" fill="#030303" stroke="#333"/><rect x="220" y="86" width="200" height="60" rx="4" fill="#b8c9db"/><path class="draw" d="M247 116H395" stroke="#5e7896" stroke-width="4"/><circle class="pulse" cx="490" cy="102" r="31" fill="#ddd"/><circle cx="490" cy="102" r="8" fill="#5f7895"/><g fill="#111" stroke="#aaa"><rect x="155" y="199" width="54" height="54" rx="8"/><rect x="220" y="199" width="54" height="54" rx="8"/><rect x="285" y="199" width="54" height="54" rx="8"/><rect x="350" y="199" width="54" height="54" rx="8"/><rect x="155" y="264" width="54" height="32" rx="7"/><rect x="220" y="264" width="54" height="32" rx="7"/><rect x="285" y="264" width="54" height="32" rx="7"/><rect x="350" y="264" width="54" height="32" rx="7"/></g><path class="draw" d="M107 181H530M128 181V296M510 181V296" fill="none" stroke="#98b8df" stroke-width="2" opacity=".65"/><text x="320" y="338" text-anchor="middle" fill="#aaa" font-size="13">custom PCB · Pico W · Rust firmware</text></svg>'
    },
    descent: {
      title:'Descent: Null', href:'/descent-null/',
      description:'A systems-driven cave game where generation, movement, injury and hazards interact.',
      svg:'<svg viewBox="0 0 640 360" role="img" aria-label="Descent Null systems path"><path d="M74 40C150 84 126 118 196 145S276 126 325 172 355 244 430 260 514 248 576 320" fill="none" stroke="#222" stroke-width="48" stroke-linecap="round"/><path class="draw" d="M74 40C150 84 126 118 196 145S276 126 325 172 355 244 430 260 514 248 576 320" fill="none" stroke="#98b8df" stroke-width="4" stroke-linecap="round"/><circle class="pulse" cx="78" cy="42" r="14" fill="#b8c9db"/><circle class="pulse" cx="197" cy="145" r="9" fill="#ddd"/><circle class="pulse" cx="326" cy="173" r="9" fill="#ddd"/><circle class="pulse" cx="430" cy="260" r="9" fill="#ddd"/><rect x="529" y="291" width="78" height="44" rx="7" fill="#ddd"/><text x="568" y="319" text-anchor="middle" fill="#111" font-size="12" font-weight="700">extract</text><text x="110" y="100" fill="#777" font-size="12">movement</text><text x="220" y="115" fill="#777" font-size="12">injury</text><text x="342" y="214" fill="#777" font-size="12">hazards</text><text x="451" y="232" fill="#777" font-size="12">crafting</text></svg>'
    }
  };

  const switches = [...document.querySelectorAll('.project-switch')];
  const diagram = document.querySelector('#project-diagram');
  const title = document.querySelector('#project-stage-title');
  const desc = document.querySelector('#project-stage-description');
  const link = document.querySelector('#project-stage-link');

  function selectProject(key) {
    const item = diagrams[key];
    if (!item || !diagram) return;
    switches.forEach(btn => btn.setAttribute('aria-selected', String(btn.dataset.project === key)));
    diagram.classList.remove('is-animating');
    diagram.innerHTML = item.svg;
    title.textContent = item.title;
    desc.textContent = item.description;
    link.href = item.href;
    if (!reduceMotion) requestAnimationFrame(() => diagram.classList.add('is-animating'));
  }
  switches.forEach(btn => btn.addEventListener('click', () => selectProject(btn.dataset.project)));
  if (switches.length) selectProject('deadlock');

  if (diagram && !reduceMotion && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    diagram.addEventListener('pointermove', e => {
      const r = diagram.getBoundingClientRect();
      diagram.style.setProperty('--px', (((e.clientX-r.left)/r.width-.5)*10).toFixed(1)+'px');
      diagram.style.setProperty('--py', (((e.clientY-r.top)/r.height-.5)*8).toFixed(1)+'px');
    });
    diagram.addEventListener('pointerleave', () => {
      diagram.style.setProperty('--px','0px'); diagram.style.setProperty('--py','0px');
    });
  }

  const workflow = document.querySelector('.workflow');
  const steps = [...document.querySelectorAll('.workflow-step')];
  if (workflow && steps.length) {
    const updateWorkflow = () => {
      const r = workflow.getBoundingClientRect();
      const center = innerHeight * .62;
      const progress = Math.max(0, Math.min(1, (center-r.top) / Math.max(1,r.height)));
      const active = Math.min(steps.length-1, Math.floor(progress*steps.length));
      steps.forEach((s,i) => s.classList.toggle('is-active', i <= active));
      workflow.style.setProperty('--progress', (progress*100).toFixed(1)+'%');
    };
    if (!reduceMotion) {
      addEventListener('scroll', updateWorkflow, {passive:true}); addEventListener('resize', updateWorkflow); updateWorkflow();
    } else {
      steps.forEach(s => s.classList.add('is-active')); workflow.style.setProperty('--progress','100%');
    }
  }
})();