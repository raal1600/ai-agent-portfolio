(() => {
  const params = new URLSearchParams(window.location.search);
  const root = document.documentElement;
  const requestedScene = params.get('scene');

  if (params.has('poster')) root.dataset.mode = 'poster';
  else if (params.has('capture') || requestedScene) root.dataset.mode = 'capture';
  else root.dataset.mode = 'transcript';

  if (requestedScene && /^[1-5]$/.test(requestedScene)) root.dataset.scene = requestedScene;
})();
