import { QueryResult } from "tauri-plugin-sql-api";
import db from "./client";

export type SnapshotModel = {
  id: string;
  data: string;
  // ISO date string
  last_modification: string;
};

function getSnapshot(id: string): Promise<SnapshotModel> {
  return db.select("SELECT * FROM snapshots WHERE id=?", [id]);
}
function getSnapshots(): Promise<SnapshotModel[]> {
  return db.select("SELECT * FROM snapshots");
}

function updateOrCreateSnapshot(
  id: string,
  data: string,
  last_modification = new Date().toISOString()
): Promise<QueryResult> {
  return db.execute(
    "INSERT INTO snapshots (id, data, last_modification) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET data=?",
    [id, data, last_modification, data]
  );
}
function deleteSnapshot(id: string): Promise<QueryResult> {
  return db.execute("DELETE FROM snapshots WHERE id=?", [id]);
}

export { getSnapshot, getSnapshots, updateOrCreateSnapshot, deleteSnapshot };
