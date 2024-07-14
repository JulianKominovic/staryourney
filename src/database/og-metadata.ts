import db from "./client";

export type OgMetadataModel = {
  url: string;
  title: string;
  description: string;
  filename?: string;
};

export function createOrUpdateOgMetadata({
  description,
  title,
  url,
  filename,
}: OgMetadataModel) {
  return db.execute(
    "INSERT INTO og_metadata (url, title, description, filename) VALUES (?, ?, ?, ?) ON CONFLICT(url) DO UPDATE SET title=?, description=?, filename=?",
    [url, title, description, filename, title, description, filename]
  );
}

export async function getOgMetadataByUrl(
  url: string
): Promise<OgMetadataModel | undefined> {
  const result = await db.select("SELECT * FROM og_metadata WHERE url=?", [
    url,
  ]);
  return (result as any)[0];
}
