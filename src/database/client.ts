import Database from "tauri-plugin-sql-api";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load("sqlite:test.db");
function createEditorTable() {
  return db.execute(
    "CREATE TABLE IF NOT EXISTS snapshots (id TEXT PRIMARY KEY, data TEXT, last_modification DATETIME DEFAULT CURRENT_TIMESTAMP)"
  );
}
// await db.execute(`
//         DROP TABLE IF EXISTS snapshots
//       `);
await createEditorTable();
export default db;
