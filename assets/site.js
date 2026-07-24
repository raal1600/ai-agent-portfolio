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

const setupWorkflowDemo = () => {
  document.querySelectorAll('[data-workflow-demo]').forEach((demo) => {
    const video = demo.querySelector('video');
    const chapters = [...demo.querySelectorAll('[data-chapter-start]')];
    const status = demo.querySelector('[data-chapter-status]');
    if (!video || !chapters.length) return;
    let activeIndex = -1;

    const setActive = (index) => {
      const active = Math.max(0, Math.min(index, chapters.length - 1));
      if (active === activeIndex) return;
      activeIndex = active;
      chapters.forEach((chapter, chapterIndex) => {
        if (chapterIndex === active) chapter.setAttribute('aria-current', 'step');
        else chapter.removeAttribute('aria-current');
      });
      const chapter = chapters[active];
      if (status) {
        const title = chapter.querySelector('strong')?.textContent?.trim() || `Chapter ${active + 1}`;
        const description = chapter.querySelector('span > span')?.textContent?.trim() || '';
        const strong = document.createElement('strong');
        strong.textContent = `Step ${active + 1} · ${title}.`;
        status.replaceChildren(strong, document.createTextNode(description ? ` ${description}.` : ''));
      }
    };

    const seek = (index) => {
      const start = Number(chapters[index].dataset.chapterStart) || 0;
      const applySeek = () => {
        video.currentTime = start + .01;
        video.play().catch(() => {});
      };
      if (video.readyState >= 1) applySeek();
      else video.addEventListener('loadedmetadata', applySeek, { once: true });
      setActive(index);
    };

    chapters.forEach((chapter, index) => {
      chapter.addEventListener('click', (event) => {
        event.preventDefault();
        seek(index);
      });
      chapter.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = chapters.length - 1;
        else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % chapters.length;
        else next = (index - 1 + chapters.length) % chapters.length;
        chapters[next].focus();
      });
    });

    video.addEventListener('timeupdate', () => {
      const time = video.currentTime;
      const active = chapters.reduce((result, chapter, index) => time >= Number(chapter.dataset.chapterStart) ? index : result, 0);
      setActive(active);
    });
    setActive(0);
  });
};

reveal();
setupDemoSwitcher();
setupWorkflowDemo();
