import db from "./client";

export type KeywordsModel = {
  keyword: string;
  snapshot_id: string;
};

export function createKeyword({ keyword, snapshot_id }: KeywordsModel) {
  console.log("createKeyword", keyword, snapshot_id);
  return db.execute(
    "INSERT INTO keywords (keyword, snapshot_id) VALUES (?, ?) ON CONFLICT(keyword, snapshot_id) DO NOTHING",
    [keyword, snapshot_id]
  );
}

export function getKeywordsBySnapshotId(snapshot_id: string) {
  return db.select("SELECT * FROM keywords WHERE snapshot_id=?", [snapshot_id]);
}

export async function getKeywords(): Promise<KeywordsModel[]> {
  const result = await db.select("SELECT * FROM keywords").catch(console.error);
  return result as KeywordsModel[];
}
