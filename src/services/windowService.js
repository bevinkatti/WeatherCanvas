import { appWindow } from '@tauri-apps/api/window';

// placeholder helpers to set window position relative to current
export async function setWindowPosition(dx, dy) {
  try {
    const pos = await appWindow.position();
    await appWindow.setPosition({ x: pos.x + dx, y: pos.y + dy });
  } catch (e) {
    console.warn('setWindowPosition failed', e);
  }
}
