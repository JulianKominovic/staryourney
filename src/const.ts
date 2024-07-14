import { appDataDir } from "@tauri-apps/api/path";
const APP_DIR = await appDataDir();
export const ASSETS_FOLDER = APP_DIR + "/assets";
export const ENTRIES_DATABASE_FILENAME = "entries.db";
export const ENTRIES_DATABASE_FILE = APP_DIR + "/" + ENTRIES_DATABASE_FILENAME;
