// URLs carry the locale: shared links and browser back/forward remain predictable.
// The small enhancement carries position; ordinary links work without JavaScript.
const languageLinks = [...document.querySelectorAll('[data-language-link]')];
const video = document.querySelector('[data-presentation-video]');
const chapterLinks = [...document.querySelectorAll('[data-chapter-id]')];
const position = () => {
  const hash = location.hash;
  for (const link of languageLinks) {
    const target = new URL(link.href);
    target.hash = hash;
    if (video && Number.isFinite(video.currentTime) && video.currentTime > 0) {
      target.searchParams.set('t', video.currentTime.toFixed(2));
      target.hash = 'product-view';
    } else if (video) {
      target.searchParams.delete('t');
    }
    link.href = target.href;
  }
};
window.addEventListener('hashchange', position);
video?.addEventListener('timeupdate', position);
languageLinks.forEach(link => link.addEventListener('pointerdown', position));

if (video) {
  const requested = Number(new URL(location.href).searchParams.get('t'));
  const restore = () => {
    if (Number.isFinite(requested) && requested > 0 && requested < video.duration) video.currentTime = requested;
    position();
  };
  if (video.readyState >= 1) restore();
  else video.addEventListener('loadedmetadata', restore, { once: true });
  // Hash links are for readable transcripts; the selected chapter is carried
  // through the video time when a visitor chooses the other language.
  chapterLinks.forEach(link => link.addEventListener('click', () => queueMicrotask(position)));
}
position();
