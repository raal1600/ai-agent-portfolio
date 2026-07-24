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
    const filmstrip = demo.querySelector('.demo-filmstrip');
    const chapters = [...demo.querySelectorAll('[data-chapter-start]')];
    const status = demo.querySelector('[data-chapter-status]');
    if (!video || !chapters.length) return;
    let activeIndex = -1;

    const scrollToChapter = (chapter) => {
      if (!filmstrip || !chapter) return;
      const left = chapter.offsetLeft - filmstrip.offsetLeft - Math.max(0, (filmstrip.clientWidth - chapter.clientWidth) / 2);
      filmstrip.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    const setActive = (index, scroll = true) => {
      const active = Math.max(0, Math.min(index, chapters.length - 1));
      if (active === activeIndex) return false;
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
      if (scroll) scrollToChapter(chapter);
      return true;
    };

    chapters.forEach((chapter, index) => {
      chapter.addEventListener('click', (event) => {
        const start = Number(chapter.dataset.chapterStart);
        const validClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
        const usableVideo = video.readyState >= 1 && !video.error && video.networkState !== HTMLMediaElement.NETWORK_NO_SOURCE;
        const validTime = Number.isFinite(start) && start >= 0 && Number.isFinite(video.duration) && start < video.duration;
        if (!validClick || !usableVideo || !validTime) return;
        event.preventDefault();
        video.currentTime = start + .01;
        video.play().catch(() => {});
        setActive(index);
      });
    });

    video.addEventListener('timeupdate', () => {
      const time = video.currentTime;
      const active = chapters.reduce((result, chapter, index) => time >= Number(chapter.dataset.chapterStart) ? index : result, 0);
      setActive(active);
    });
    setActive(0, false);
  });
};

reveal();
setupDemoSwitcher();
setupWorkflowDemo();
