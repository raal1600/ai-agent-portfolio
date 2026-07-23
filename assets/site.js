const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveal = () => {
  const nodes = [...document.querySelectorAll('[data-reveal]')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  nodes.forEach((node) => observer.observe(node));
};

const setupDemoSwitcher = () => {
  document.querySelectorAll('[data-demo-switcher]').forEach((switcher) => {
    const tabs = [...switcher.querySelectorAll('[role="tab"]')];
    const panels = [...switcher.querySelectorAll('[role="tabpanel"]')];
    const activate = (tab, focus = false) => {
      tabs.forEach((candidate) => {
        const selected = candidate === tab;
        candidate.setAttribute('aria-selected', String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        const active = panel.id === tab.getAttribute('aria-controls');
        if (!active) panel.querySelector('video')?.pause();
        panel.hidden = !active;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else next = (index - 1 + tabs.length) % tabs.length;
        activate(tabs[next], true);
      });
    });
    const selected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (selected) activate(selected);
  });
};

const setupImageDemo = () => {
  document.querySelectorAll('[data-image-demo]').forEach((demo) => {
    const slides = [...demo.querySelectorAll('[data-slide]')];
    const buttons = [...demo.querySelectorAll('[data-slide-to]')];
    const status = demo.querySelector('[data-slide-status]');
    let active = 0;
    const show = (index, focus = false) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== active; });
      buttons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === active;
        button.setAttribute('aria-current', selected ? 'step' : 'false');
        if (selected && focus) button.focus();
      });
      if (status) status.textContent = `${active + 1} / ${slides.length}`;
    };
    buttons.forEach((button, index) => button.addEventListener('click', () => show(index)));
    demo.querySelector('[data-slide-prev]')?.addEventListener('click', () => show(active - 1));
    demo.querySelector('[data-slide-next]')?.addEventListener('click', () => show(active + 1));
    demo.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') show(active - 1, true);
      if (event.key === 'ArrowRight') show(active + 1, true);
    });
    show(0);
  });
};

reveal();
setupDemoSwitcher();
setupImageDemo();
