import { QueryResult } from "tauri-plugin-sql-api";
import db from "./client";

export type SnapshotModel = {
  id: string;
  data: string;
  // ISO date string
  last_modified: string;
  // ISO date string
  created_at: string;
};

function getSnapshot(id: string): Promise<SnapshotModel> {
  return db.select("SELECT * FROM snapshots WHERE id=?", [id]);
}
function getSnapshots(): Promise<SnapshotModel[]> {
  return db.select("SELECT * FROM snapshots ORDER BY last_modified DESC");
}

function updateOrCreateSnapshot(
  id: string,
  data: string,
  last_modified = new Date().toISOString(),
  created_at = new Date().toISOString()
): Promise<QueryResult> {
  return db.execute(
    "INSERT INTO snapshots (id, data, last_modified, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET data=?, last_modified=?",
    [id, data, last_modified, created_at, data, last_modified]
  );
}
function deleteSnapshot(id: string): Promise<QueryResult> {
  return db.execute("DELETE FROM snapshots WHERE id=?", [id]);
}

export { getSnapshot, getSnapshots, updateOrCreateSnapshot, deleteSnapshot };
