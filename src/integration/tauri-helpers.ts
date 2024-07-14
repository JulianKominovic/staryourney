import { invoke } from "@tauri-apps/api/tauri";
export function getKeywords(text: string): Promise<string[]> {
  return invoke("get_keywords_event", { text });
}
