import { getWeather } from '../services/weatherApi.js';
import { store } from '../services/store.js';
import { injectInlineSvg } from '../utils/inlineSvg.js';
import manifest from '../assets/manifest.json';
import { setWindowPosition } from '../services/windowService.js';

export function WeatherWidget() {
  const root = document.createElement('div');
  root.className = 'widget';

  // Header / city select
  const header = document.createElement('header');
  const select = document.createElement('select');
  Object.keys(manifest.cities).forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = city;
    select.appendChild(opt);
  });

  header.appendChild(select);
  root.appendChild(header);

  // Landmark container (SVG will be injected here)
  const landmark = document.createElement('div');
  landmark.className = 'landmark';
  root.appendChild(landmark);

  // Info: time + temp
  const info = document.createElement('div');
  info.className = 'info';
  const timeEl = document.createElement('div');
  timeEl.className = 'time';
  const tempEl = document.createElement('div');
  tempEl.className = 'temp';
  info.appendChild(timeEl);
  info.appendChild(tempEl);
  root.appendChild(info);

  // Canvas overlay
  const canvas = document.createElement('canvas');
  canvas.className = 'overlay';
  canvas.width = 320;
  canvas.height = 480;
  root.appendChild(canvas);

  // make draggable: click-drag to move
  let dragging = false;
  let dragStart = null;
  root.addEventListener('pointerdown', (e) => {
    dragging = true;
    dragStart = { x: e.screenX, y: e.screenY };
  });
  window.addEventListener('pointerup', async (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.screenX - dragStart.x;
    const dy = e.screenY - dragStart.y;
    // ask window service to update position (placeholder)
    await setWindowPosition(dx, dy);
  });

  let updateTimer = null;
  let timeTimer = null;

  async function loadCity(city) {
    const meta = manifest.cities[city];
    timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // load inline SVG asset (if provided)
    landmark.innerHTML = '';
    if (meta.asset) {
      try {
        await injectInlineSvg(meta.asset, landmark);
      } catch (e) {
        const img = document.createElement('img');
        img.src = meta.asset;
        img.alt = meta.landmark || city;
        img.className = 'landmark-img';
        landmark.appendChild(img);
      }
    }

    try {
      const data = await getWeather(meta.lat, meta.lon);
      const t = Math.round(data.main.temp);
      const cond = data.weather && data.weather[0] && data.weather[0].main;
      tempEl.textContent = `${t}°C · ${cond || ''}`;

      // primitive overlay selection: draw rain/snow/clear
      startOverlay(cond ? cond.toLowerCase() : 'clear', canvas);
    } catch (err) {
      tempEl.textContent = '—';
      console.error('Weather load failed', err);
    }

    // persist selected city
    store.set('selectedCity', city);
  }

  select.addEventListener('change', () => {
    const city = select.value;
    loadCity(city);
  });

  // restore selected city
  const selected = store.get('selectedCity') || Object.keys(manifest.cities)[0];
  select.value = selected;

  // initial
  loadCity(select.value);

  // refresh every 10 minutes
  updateTimer = setInterval(() => loadCity(select.value), 10 * 60 * 1000);

  // update local time every 30s
  timeTimer = setInterval(() => {
    timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, 30 * 1000);

  // simple overlay engine (starter)
  function startOverlay(condition, canvasEl) {
    const ctx = canvasEl.getContext('2d');
    const w = canvasEl.width = canvasEl.clientWidth || 320;
    const h = canvasEl.height = canvasEl.clientHeight || 480;

    // stop previous animation by replacing requestAnimationFrame loop reference
    let particles = [];

    function setupParticles() {
      particles = [];
      if (condition.includes('rain') || condition.includes('drizzle')) {
        for (let i = 0; i < 120; i++) {
          particles.push({x: Math.random()*w, y: Math.random()*h, l: 10 + Math.random()*20, s: 6 + Math.random()*4});
        }
      } else if (condition.includes('snow')) {
        for (let i = 0; i < 80; i++) {
          particles.push({x: Math.random()*w, y: Math.random()*h, r: 1 + Math.random()*3, s: 0.5 + Math.random()*1.5});
        }
      } else {
        particles = [];
      }
    }

    setupParticles();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      if (condition.includes('rain')) {
        ctx.strokeStyle = 'rgba(180,200,255,0.6)';
        ctx.lineWidth = 1;
        particles.forEach(p => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.s, p.y + p.l);
          ctx.stroke();
          p.x += -2;
          p.y += p.s * 2;
          if (p.y > h) { p.y = -10; p.x = Math.random()*w; }
          if (p.x < -50) p.x = w + 50;
        });
      } else if (condition.includes('snow')) {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          ctx.fill();
          p.x += Math.sin(p.y/20) * 0.5;
          p.y += p.s;
          if (p.y > h) { p.y = -10; p.x = Math.random()*w; }
        });
      }
      canvasEl._rafId = requestAnimationFrame(draw);
    }

    // stop any existing loop
    if (canvasEl._rafId) cancelAnimationFrame(canvasEl._rafId);
    canvasEl._rafId = requestAnimationFrame(draw);
  }

  // cleanup if needed later
  root.cleanup = () => {
    clearInterval(updateTimer);
    clearInterval(timeTimer);
    if (canvas._rafId) cancelAnimationFrame(canvas._rafId);
  };

  return root;
}
