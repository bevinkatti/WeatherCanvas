export async function injectInlineSvg(path, container) {
  // path is relative to /src or to `dist` where assets are served
  const res = await fetch(path);
  if (!res.ok) throw new Error('SVG fetch failed');
  const text = await res.text();
  container.innerHTML = text;
  // ensure class on root svg
  const svg = container.querySelector('svg');
  if (svg) svg.classList.add('landmark-svg');
}
