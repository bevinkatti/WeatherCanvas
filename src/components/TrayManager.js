import { invoke } from '@tauri-apps/api/tauri';
import { store } from '../services/store.js';
import manifest from '../assets/manifest.json';

// this module sets up a system tray via Tauri commands in main.rs
// it also listens for store changes to update tray menu if needed

// request main process to create the tray
invoke('create_tray').catch(err => console.warn('Tray create failed', err));

// expose a simple API to change city from tray
window.__traySetCity = async (city) => {
  if (!manifest.cities[city]) return;
  store.set('selectedCity', city);
  // reload page to pick up selection (simple approach)
  window.location.reload();
};
