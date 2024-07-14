import { ASSETS_FOLDER } from "@/const";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
export async function getAsset(path: string) {
  const assetPath = await join(ASSETS_FOLDER, path);
  return convertFileSrc(assetPath);
}
