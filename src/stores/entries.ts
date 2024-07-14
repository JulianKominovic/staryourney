import {
  getSnapshots,
  SnapshotModel,
  updateOrCreateSnapshot,
} from "@/database/editor";
import { createKeyword } from "@/database/keywords";
import { getKeywords } from "@/integration/tauri-helpers";
import { getDayOfWeek, getMonthName } from "@/lib/dates";
import { create } from "zustand";

export type EntriesStore = {
  entries: (SnapshotModel & { data: any })[];
  createOrUpdateEntry: (entry: SnapshotModel) => Promise<void>;
  getEntriesGrouppedByDate: () => Record<
    number,
    Record<string, Record<string, SnapshotModel[]>>
  >;
  getEntriesTitles: () => { id: string; title: string }[];
  fetchEntries: () => Promise<EntriesStore["entries"]>;
};

const useEntries = create<EntriesStore>((set, get) => ({
  entries: [],
  async fetchEntries() {
    const entries = await getSnapshots();
    const newState = {
      entries: entries.map((entry) => ({
        ...entry,
        data: JSON.parse(entry.data),
      })),
    };
    set(newState);
    return newState.entries;
  },
  async createOrUpdateEntry(entry) {
    const blocks = JSON.parse(entry.data);
    const text = blocks
      .flatMap(
        (object: any) =>
          object.content
            ?.map((content: any) => content.text || "")
            ?.join(" ") || ""
      )
      .join("\n");

    const keywords = await getKeywords(text);
    console.log("keywords", keywords);
    const responses = await Promise.allSettled(
      keywords.map((keyword) =>
        createKeyword({ keyword, snapshot_id: entry.id })
      )
    );
    console.log("responses", responses);
    await updateOrCreateSnapshot(
      entry.id,
      entry.data,
      entry.last_modified,
      entry.created_at
    );
  },
  getEntriesGrouppedByDate() {
    const groups: Record<
      number,
      Record<string, Record<string, SnapshotModel[]>>
    > = {};
    get().entries.forEach((entry) => {
      const date = new Date(entry.created_at);
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthName = getMonthName(month);
      const day = date.getDate();
      const dayOfWeek = getDayOfWeek(date);
      const formattedDate = `${dayOfWeek} ${day}`;

      if (!groups[year]) {
        groups[year] = {};
      }
      if (!groups[year][monthName]) {
        groups[year][monthName] = {};
      }
      if (!groups[year][monthName][formattedDate]) {
        groups[year][monthName][formattedDate] = [];
      }
      groups[year][monthName][formattedDate].push(entry);
    });

    return groups;
  },
  getEntriesTitles() {
    return get().entries.map((entry) => {
      return {
        id: entry.id,
        title: entry.data[0].content[0].text,
      };
    });
  },
}));

useEntries.getState().fetchEntries();

export default useEntries;
