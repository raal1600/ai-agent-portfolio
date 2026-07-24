(() => {
  const params = new URLSearchParams(window.location.search);
  const root = document.documentElement;
  const requestedScene = params.get('scene');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (params.has('poster')) root.dataset.mode = 'poster';
  else if (params.has('capture') || requestedScene) root.dataset.mode = 'capture';
  else root.dataset.mode = 'transcript';

  const nextPaint = () => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  const waitForVisuals = async () => {
    if (document.fonts?.ready) await document.fonts.ready.catch(() => {});
    await Promise.all([...document.images].map((image) => {
      if (image.complete) return image.decode?.().catch(() => {});
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    }));
    await nextPaint();
    if (!reduceMotion) await new Promise((resolve) => window.setTimeout(resolve, 220));
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const scenes = [...document.querySelectorAll('.scene')];
    const composerPlaceholder = root.dataset.composerPlaceholder || 'Message SoherAgent or enter a command…';

    scenes.forEach((scene) => {
      if (scene.classList.contains('artifact-scene')) return;
      const bottom = scene.querySelector('.terminal-bottom');
      if (!bottom) return;
      const transcriptEditor = scene.querySelector('.transcript > .editor');
      if (transcriptEditor) bottom.prepend(transcriptEditor);
      const existingEditor = bottom.querySelector('.editor');
      if (existingEditor) {
        existingEditor.classList.add('terminal-composer-existing');
        existingEditor.setAttribute('aria-hidden', 'true');
        const existingPrompt = existingEditor.querySelector('.editor-label');
        if (existingPrompt && existingPrompt.textContent.trim() === '›') {
          existingPrompt.textContent = 'you@pi:~$';
        }
        const valueProbe = existingEditor.cloneNode(true);
        valueProbe.querySelectorAll('.editor-label, .cursor').forEach((element) => element.remove());
        if (!valueProbe.textContent.trim()) {
          const placeholder = document.createElement('span');
          placeholder.className = 'terminal-composer-input';
          placeholder.textContent = composerPlaceholder;
          const cursor = existingEditor.querySelector('.cursor');
          existingEditor.insertBefore(placeholder, cursor || null);
        }
        return;
      }

      const composer = document.createElement('div');
      composer.className = 'terminal-composer';
      composer.setAttribute('aria-hidden', 'true');

      const prompt = document.createElement('span');
      prompt.className = 'terminal-composer-prompt';
      prompt.textContent = 'you@pi:~$';

      const input = document.createElement('span');
      input.className = 'terminal-composer-input';
      input.textContent = composerPlaceholder;

      const hint = document.createElement('span');
      hint.className = 'terminal-composer-hint';
      hint.textContent = 'Enter send · Esc stop';

      composer.append(prompt, input, hint);
      bottom.prepend(composer);
    });

    const durations = scenes.map((scene) => Math.max(1000, Number(scene.dataset.duration) || 7000));
    const starts = [];
    let totalDurationMs = 0;
    durations.forEach((duration) => {
      starts.push(totalDurationMs);
      totalDurationMs += duration;
    });

    let captureFrame = 0;
    let captureEpoch = 0;
    let activeIndex = -1;

    const clampIndex = (index) => Math.max(0, Math.min(Number(index) || 0, scenes.length - 1));
    const applyScene = (index) => {
      const active = clampIndex(index);
      if (active === activeIndex) return active;
      activeIndex = active;
      scenes.forEach((scene, sceneIndex) => {
        const selected = sceneIndex === active;
        scene.classList.toggle('is-active', selected);
        scene.inert = !selected && root.dataset.mode !== 'transcript';
        scene.setAttribute('aria-hidden', String(!selected && root.dataset.mode !== 'transcript'));
      });
      root.dataset.scene = String(active + 1);
      return active;
    };

    const showScene = async (index) => {
      const active = applyScene(index);
      await waitForVisuals();
      return active;
    };

    const stopCapture = () => {
      if (captureFrame) cancelAnimationFrame(captureFrame);
      captureFrame = 0;
    };

    const startCapture = () => {
      stopCapture();
      applyScene(0);
      captureEpoch = performance.now();
      const tick = (now) => {
        const elapsed = Math.max(0, now - captureEpoch);
        const sceneIndex = starts.reduce((result, start, index) => elapsed >= start ? index : result, 0);
        applyScene(sceneIndex);
        if (elapsed < totalDurationMs) {
          captureFrame = requestAnimationFrame(tick);
        } else {
          applyScene(scenes.length - 1);
          captureFrame = 0;
          document.dispatchEvent(new CustomEvent('terminal-demo-complete', { detail: window.terminalDemo }));
        }
      };
      captureFrame = requestAnimationFrame(tick);
    };

    window.terminalDemo = {
      totalDurationMs,
      sceneStartsMs: starts,
      sceneDurationsMs: durations,
      sceneCount: scenes.length,
      showScene,
      startCapture,
      stopCapture,
    };

    try {
      if (window.terminalDemoDataReady) await window.terminalDemoDataReady;

      if (root.dataset.mode === 'transcript') {
        scenes.forEach((scene) => {
          scene.inert = false;
          scene.removeAttribute('aria-hidden');
        });
        await waitForVisuals();
      } else if (root.dataset.mode === 'poster') {
        const posterIndex = Math.max(0, scenes.findIndex((scene) => scene.hasAttribute('data-poster')));
        await showScene(posterIndex);
      } else if (requestedScene && /^\d+$/.test(requestedScene)) {
        await showScene(Number(requestedScene) - 1);
      } else if (scenes.length) {
        await showScene(0);
      }

      root.dataset.renderState = 'ready';
      document.dispatchEvent(new CustomEvent('terminal-demo-ready', { detail: window.terminalDemo }));
      if (params.has('capture') && scenes.length) requestAnimationFrame(startCapture);
    } catch (error) {
      root.dataset.renderState = 'error';
      document.dispatchEvent(new CustomEvent('terminal-demo-error', { detail: { error } }));
    }

    window.addEventListener('pagehide', stopCapture, { once: true });
  });
})();
