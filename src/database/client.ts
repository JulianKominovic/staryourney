import Database from "tauri-plugin-sql-api";
import { initEmptyDb } from "./editor";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load("sqlite:test.db");
await initEmptyDb();
export default db;
