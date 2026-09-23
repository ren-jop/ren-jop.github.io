
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => document.body.classList.add('ready'));

  const diagrams = {
    deadlock: {
      title: 'Deadlock',
      description: 'A root daemon, schedule logic and distraction policy working as one enforcement path.',
      href: '/deadlock/',
      svg: `
      <svg viewBox="0 0 640 360" role="img" aria-label="Deadlock architecture diagram">
        <rect x="55" y="58" width="150" height="92" rx="18" fill="#f8f9fa" stroke="#182a36" stroke-width="2"/>
        <path d="M92 104a35 35 0 1 0 54-29 28 28 0 1 1-54 29Z" fill="#9a5c3c" opacity=".9"/>
        <text x="130" y="178" text-anchor="middle" fill="#182a36" font-size="16" font-weight="700">schedule</text>
        <path class="draw" d="M205 104H300" fill="none" stroke="#315b7b" stroke-width="4"/>
        <rect class="pulse" x="300" y="55" width="150" height="100" rx="18" fill="#182a36"/>
        <text x="375" y="96" text-anchor="middle" fill="#fff" font-size="18" font-weight="700">daemon</text>
        <text x="375" y="122" text-anchor="middle" fill="#dbe5ec" font-size="14">root enforcement</text>
        <path class="draw" d="M450 104H545V218" fill="none" stroke="#315b7b" stroke-width="4"/>
        <rect class="pulse" x="470" y="218" width="150" height="86" rx="18" fill="#f8f9fa" stroke="#182a36" stroke-width="2"/>
        <text x="545" y="254" text-anchor="middle" fill="#182a36" font-size="17" font-weight="700">sleep + block</text>
        <text x="545" y="278" text-anchor="middle" fill="#4a5b66" font-size="13">system response</text>
        <path class="draw" d="M300 104H260V262H166" fill="none" stroke="#c7d0d6" stroke-width="3"/>
        <rect x="40" y="226" width="126" height="72" rx="16" fill="#f8f9fa" stroke="#9eabb4" stroke-width="2"/>
        <text x="103" y="257" text-anchor="middle" fill="#182a36" font-size="15" font-weight="700">menu app</text>
        <text x="103" y="278" text-anchor="middle" fill="#4a5b66" font-size="12">status / controls</text>
      </svg>`
    },
    focus: {
      title: 'Focus',
      description: 'Countdown and count-up sessions, local history and a direct bridge into Deadlock.',
      href: '/focus/',
      svg: `
      <svg viewBox="0 0 640 360" role="img" aria-label="Focus timer diagram">
        <circle cx="205" cy="180" r="104" fill="#f8f9fa" stroke="#c7d0d6" stroke-width="20"/>
        <circle class="draw" cx="205" cy="180" r="104" fill="none" stroke="#315b7b" stroke-width="20" stroke-linecap="round" pathLength="100" stroke-dasharray="72 100" transform="rotate(-90 205 180)"/>
        <text x="205" y="170" text-anchor="middle" fill="#182a36" font-size="45" font-weight="700">42:18</text>
        <text x="205" y="204" text-anchor="middle" fill="#9a5c3c" font-size="15" font-weight="700">COUNT UP</text>
        <path class="draw" d="M330 180H405" fill="none" stroke="#315b7b" stroke-width="4"/>
        <rect class="pulse" x="405" y="92" width="182" height="72" rx="16" fill="#182a36"/>
        <text x="496" y="124" text-anchor="middle" fill="#fff" font-size="16" font-weight="700">session history</text>
        <text x="496" y="145" text-anchor="middle" fill="#dbe5ec" font-size="12">planned vs actual</text>
        <rect class="pulse" x="405" y="199" width="182" height="72" rx="16" fill="#f8f9fa" stroke="#182a36" stroke-width="2"/>
        <text x="496" y="230" text-anchor="middle" fill="#182a36" font-size="16" font-weight="700">Deadlock IPC</text>
        <text x="496" y="251" text-anchor="middle" fill="#4a5b66" font-size="12">protect the session</text>
      </svg>`
    },
    planner: {
      title: 'Planner',
      description: 'Apple Calendar stays the source of truth while Planner turns schedule into execution and history.',
      href: '/planner/',
      svg: `
      <svg viewBox="0 0 640 360" role="img" aria-label="Planner workflow diagram">
        <rect x="45" y="52" width="250" height="250" rx="20" fill="#f8f9fa" stroke="#182a36" stroke-width="2"/>
        <path d="M45 108H295M108 108V302M171 108V302M234 108V302M45 171H295M45 234H295" stroke="#c7d0d6" stroke-width="2"/>
        <rect x="176" y="176" width="53" height="53" rx="10" fill="#9a5c3c" opacity=".9"/>
        <rect x="239" y="113" width="51" height="53" rx="10" fill="#315b7b" opacity=".9"/>
        <text x="170" y="86" text-anchor="middle" fill="#182a36" font-size="18" font-weight="700">Apple Calendar</text>
        <path class="draw" d="M295 180H375" fill="none" stroke="#315b7b" stroke-width="4"/>
        <rect class="pulse" x="375" y="91" width="215" height="84" rx="18" fill="#182a36"/>
        <text x="482" y="126" text-anchor="middle" fill="#fff" font-size="17" font-weight="700">Focus</text>
        <text x="482" y="150" text-anchor="middle" fill="#dbe5ec" font-size="13">start scheduled block</text>
        <path class="draw" d="M482 175V214" fill="none" stroke="#315b7b" stroke-width="4"/>
        <rect class="pulse" x="375" y="214" width="215" height="84" rx="18" fill="#f8f9fa" stroke="#182a36" stroke-width="2"/>
        <text x="482" y="249" text-anchor="middle" fill="#182a36" font-size="17" font-weight="700">history</text>
        <text x="482" y="273" text-anchor="middle" fill="#4a5b66" font-size="13">planned ↔ actual</text>
      </svg>`
    },
    oxide: {
      title: 'Oxide Keys',
      description: 'A custom handheld where PCB layout, physical controls and embedded Rust firmware meet.',
      href: '/oxide-keys/',
      svg: `
      <svg viewBox="0 0 640 360" role="img" aria-label="Oxide Keys handheld diagram">
        <rect x="82" y="42" width="476" height="276" rx="34" fill="#315b7b" stroke="#182a36" stroke-width="4"/>
        <rect x="202" y="70" width="236" height="92" rx="10" fill="#182a36"/>
        <rect x="220" y="86" width="200" height="60" rx="5" fill="#dbe5ec"/>
        <path class="draw" d="M247 116H395" stroke="#9a5c3c" stroke-width="4"/>
        <circle class="pulse" cx="490" cy="102" r="31" fill="#eef1f3" stroke="#182a36" stroke-width="3"/>
        <circle cx="490" cy="102" r="8" fill="#9a5c3c"/>
        <g fill="#f8f9fa" stroke="#182a36" stroke-width="2">
          <rect x="155" y="199" width="54" height="54" rx="9"/><rect x="220" y="199" width="54" height="54" rx="9"/>
          <rect x="285" y="199" width="54" height="54" rx="9"/><rect x="350" y="199" width="54" height="54" rx="9"/>
          <rect x="155" y="264" width="54" height="32" rx="8"/><rect x="220" y="264" width="54" height="32" rx="8"/>
          <rect x="285" y="264" width="54" height="32" rx="8"/><rect x="350" y="264" width="54" height="32" rx="8"/>
        </g>
        <path class="draw" d="M107 181H530M128 181V296M510 181V296" fill="none" stroke="#e7b095" stroke-width="2" opacity=".8"/>
        <text x="490" y="165" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">encoder</text>
        <text x="320" y="338" text-anchor="middle" fill="#182a36" font-size="14" font-weight="700">custom PCB · Pico W · Rust firmware</text>
      </svg>`
    },
    descent: {
      title: 'Descent: Null',
      description: 'A systems-driven cave game where generation, movement, injury and hazards interact.',
      href: '/descent-null/',
      svg: `
      <svg viewBox="0 0 640 360" role="img" aria-label="Descent Null cave system diagram">
        <path d="M74 40C150 84 126 118 196 145S276 126 325 172 355 244 430 260 514 248 576 320" fill="none" stroke="#9eabb4" stroke-width="48" stroke-linecap="round" opacity=".55"/>
        <path class="draw" d="M74 40C150 84 126 118 196 145S276 126 325 172 355 244 430 260 514 248 576 320" fill="none" stroke="#315b7b" stroke-width="5" stroke-linecap="round"/>
        <circle class="pulse" cx="78" cy="42" r="15" fill="#9a5c3c"/>
        <circle class="pulse" cx="197" cy="145" r="10" fill="#182a36"/>
        <circle class="pulse" cx="326" cy="173" r="10" fill="#182a36"/>
        <circle class="pulse" cx="430" cy="260" r="10" fill="#182a36"/>
        <rect x="529" y="291" width="78" height="44" rx="8" fill="#182a36"/>
        <text x="568" y="319" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">extract</text>
        <text x="110" y="100" fill="#4a5b66" font-size="13">movement</text>
        <text x="220" y="115" fill="#4a5b66" font-size="13">injury</text>
        <text x="342" y="214" fill="#4a5b66" font-size="13">hazards</text>
        <text x="451" y="232" fill="#4a5b66" font-size="13">crafting</text>
      </svg>`
    }
  };

  const switches = [...document.querySelectorAll('.project-switch')];
  const diagram = document.querySelector('#project-diagram');
  const metaTitle = document.querySelector('#project-stage-title');
  const metaDescription = document.querySelector('#project-stage-description');
  const metaLink = document.querySelector('#project-stage-link');

  function selectProject(key) {
    const item = diagrams[key];
    if (!item || !diagram) return;
    switches.forEach(btn => btn.setAttribute('aria-selected', String(btn.dataset.project === key)));
    diagram.classList.remove('is-animating');
    diagram.innerHTML = item.svg;
    metaTitle.textContent = item.title;
    metaDescription.textContent = item.description;
    metaLink.href = item.href;
    if (!reduceMotion) requestAnimationFrame(() => diagram.classList.add('is-animating'));
  }

  switches.forEach(btn => btn.addEventListener('click', () => selectProject(btn.dataset.project)));

  if (switches.length && diagram) {
    selectProject(switches.find(x => x.getAttribute('aria-selected') === 'true')?.dataset.project || switches[0].dataset.project);
  }

  if (diagram && !reduceMotion && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    diagram.addEventListener('pointermove', (e) => {
      const r = diagram.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 8;
      const y = ((e.clientY - r.top) / r.height - .5) * 8;
      diagram.style.setProperty('--px', x.toFixed(1) + 'px');
      diagram.style.setProperty('--py', y.toFixed(1) + 'px');
    });
    diagram.addEventListener('pointerleave', () => {
      diagram.style.setProperty('--px', '0px');
      diagram.style.setProperty('--py', '0px');
    });
  }

  const workflow = [...document.querySelectorAll('.workflow-step')];
  if ('IntersectionObserver' in window && !reduceMotion) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, {threshold:.35});
    workflow.forEach(el => obs.observe(el));
  } else {
    workflow.forEach(el => el.classList.add('is-visible'));
  }
})();
