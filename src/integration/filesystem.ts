import { BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
export async function writeBinaryFileToDisk(
  filename: string,
  data: Uint8Array | ArrayBuffer
): Promise<void> {
  return await writeBinaryFile(await join("assets", filename), data, {
    dir: BaseDirectory.AppData,
  });
}
