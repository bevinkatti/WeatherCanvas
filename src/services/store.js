import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

// lightweight wrapper around localStorage with Tauri fs fallback
export const store = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      // swallow — fallback or future: persist to file using Tauri fs
    }
  }
};
