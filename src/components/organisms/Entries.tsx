import { SnapshotModel } from "@/database/editor";
import { BlockNoteEditor } from "@blocknote/core";
import { useEffect, useState } from "react";
import MarkdownEditor, {
  customEditorSettings,
} from "../molecules/editor/MarkdownEditor";

import { getRelativeTime } from "@/lib/dates";
import useEntries, { EntriesStore } from "@/stores/entries";

type Props = {};

function Entry({ entry }: { entry: EntriesStore["entries"][0] }) {
  const createOrUpdateEntry = useEntries((state) => state.createOrUpdateEntry);
  const editor = BlockNoteEditor.create({
    ...customEditorSettings,
    initialContent: entry.data,
  });
  return (
    <article className="mt-8">
      <span className="px-2 py-1 text-xs rounded-full cursor-default select-none text-neutral-600">
        {getRelativeTime(new Date(entry.created_at))}
      </span>
      <div className="pl-16 mt-10 bg-white rounded-xl" id={entry.id}>
        <MarkdownEditor
          onChange={({ blocks }) => {
            createOrUpdateEntry({
              id: entry.id,
              data: JSON.stringify(blocks),
              last_modified: new Date().toISOString(),
              created_at: entry.created_at,
            });
          }}
          editor={editor as any}
        />
      </div>
    </article>
  );
}

const Entries = (props: Props) => {
  const getEntriesGrouppedByDate = useEntries(
    (state) => state.getEntriesGrouppedByDate
  );

  const grouppedEntries = Object.entries(getEntriesGrouppedByDate() ?? {});

  return grouppedEntries.flatMap(([year, months]) => {
    return (
      <section key={year} className="relative mt-8">
        <h2 className="font-black text-black/[0.02] text-8xl absolute -top-10 right-0">
          {year}
        </h2>
        {Object.entries(months).map(([month, entries]) => (
          <section key={month} className="relative z-10 mt-4">
            <h3 className="mb-4 text-4xl font-bold">{month}</h3>
            {Object.entries(entries).map(([day, entries]) => (
              <section key={day} className="mt-4">
                <h4 className="text-2xl font-bold text-neutral-500">{day}</h4>
                {entries.map((entry) => (
                  <Entry key={entry.id} entry={entry} />
                ))}
              </section>
            ))}
          </section>
        ))}
      </section>
    );
    // return
  });
};

export default Entries;
