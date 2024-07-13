// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;
#[cfg(target_os = "macos")]
#[macro_use]
extern crate cocoa;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};
mod plugins;
use plugins::macos_traffic_lights::{init, setup_traffic_light_positioner};

fn main() {
    tauri::Builder::default()
        .setup(move |app| {
            let window = app.get_window("main").unwrap();
            let window_clone = window.clone();
            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            #[cfg(target_os = "macos")]
            window.on_window_event(move |event| {
                if let tauri::WindowEvent::ThemeChanged(_theme) = event {
                    setup_traffic_light_positioner(window_clone.clone())
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
