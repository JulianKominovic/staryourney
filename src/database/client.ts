import { ENTRIES_DATABASE_FILENAME } from "@/const";
import Database from "tauri-plugin-sql-api";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load("sqlite:" + ENTRIES_DATABASE_FILENAME);

function createEditorTable() {
  return db.execute(
    "CREATE TABLE IF NOT EXISTS snapshots (id TEXT PRIMARY KEY, data TEXT, last_modified DATETIME DEFAULT CURRENT_TIMESTAMP, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
  );
}
function createOgMetadata() {
  return db.execute(
    "CREATE TABLE IF NOT EXISTS og_metadata (url TEXT PRIMARY KEY, title TEXT, description TEXT, filename TEXT)"
  );
}
function createKeywordsTable() {
  return db.execute(
    "CREATE TABLE IF NOT EXISTS keywords(keyword TEXT, snapshot_id TEXT, FOREIGN KEY(snapshot_id) REFERENCES snapshots(id), PRIMARY KEY (keyword, snapshot_id))"
  );
}
// await db.execute(`
//         DROP TABLE IF EXISTS keywords;
//       `);
await createEditorTable().catch(console.error);
await createOgMetadata().catch(console.error);
await createKeywordsTable().catch(console.error);
export default db;
