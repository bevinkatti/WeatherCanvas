#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent, Manager};

fn main() {
  let item_quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let item_open = CustomMenuItem::new("open".to_string(), "Open");
  let tray_menu = SystemTrayMenu::new()
    .add_item(item_open)
    .add_item(item_quit);
  let tray = SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    .system_tray(tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => {
        match id.as_str() {
          "quit" => {
            std::process::exit(0);
          }
          "open" => {
            let _ = app.get_window("main").map(|w| w.show());
          }
          _ => {}
        }
      }
      _ => {}
    })
    .invoke_handler(tauri::generate_handler![create_tray])
    .setup(|_app| Ok(()))
    .run(tauri::generate_context!())
    .expect("failed to run app");
}

#[tauri::command]
fn create_tray() -> String {
  // no-op placeholder to be called from renderer to ensure tray is present
  "ok".to_string()
}
