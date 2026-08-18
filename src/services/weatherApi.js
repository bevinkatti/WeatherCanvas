const API_KEY = import.meta.env.VITE_OWM_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const cache = {};

export async function getWeather(lat, lon) {
  if (!API_KEY) throw new Error('OpenWeatherMap API key not set (VITE_OWM_API_KEY).');
  const cacheKey = `${lat},${lon}`;
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const url = `${BASE_URL}/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Weather fetch failed: ${response.status} ${txt}`);
  }
  const data = await response.json();
  cache[cacheKey] = { data, timestamp: Date.now() };
  return data;
}
