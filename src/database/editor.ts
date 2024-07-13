import db from "./client";
function getSnapshot(id: string) {
  return db.select("SELECT * FROM snapshots WHERE id=?", [id]);
}
function getSnapshots() {
  return db.select("SELECT * FROM snapshots");
}
function createSnapshot(id: string, data: string) {
  return db.execute("INSERT INTO snapshots (id, data) VALUES (?, ?)", [
    id,
    data,
  ]);
}
function updateSnapshot(id: string, data: string) {
  return db.execute("UPDATE snapshots SET data=? WHERE id=?", [data, id]);
}
function deleteSnapshot(id: string) {
  return db.execute("DELETE FROM snapshots WHERE id=?", [id]);
}
function createEditorTable() {
  return db.execute(`
    CREATE TABLE IF NOT EXISTS snapshots (
      id TEXT PRIMARY KEY,
      data TEXT
    )
  `);
}
export {
  getSnapshot,
  getSnapshots,
  createSnapshot,
  updateSnapshot,
  deleteSnapshot,
  createEditorTable,
};
