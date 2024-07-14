import { ENTRIES_DATABASE_FILENAME } from "@/const";
import Database from "tauri-plugin-sql-api";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load("sqlite:" + ENTRIES_DATABASE_FILENAME);
function createEditorTable() {
  return db.execute(
    "CREATE TABLE IF NOT EXISTS snapshots (id TEXT PRIMARY KEY, data TEXT, last_modification DATETIME DEFAULT CURRENT_TIMESTAMP)"
  );
}
function createOgMetadata() {
  return db.execute(
    "CREATE TABLE IF NOT EXISTS og_metadata (url TEXT PRIMARY KEY, title TEXT, description TEXT, filename TEXT)"
  );
}
// await db.execute(`
//         DROP TABLE IF EXISTS snapshots
//       `);
await createEditorTable();
await createOgMetadata();
export default db;
