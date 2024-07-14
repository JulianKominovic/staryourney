import {
  getSnapshots,
  SnapshotModel,
  updateOrCreateSnapshot,
} from "@/database/editor";
import { cn } from "@/lib/utils";
import { BlockNoteEditor } from "@blocknote/core";
import { useBlockNoteEditor } from "@blocknote/react";
import React, { useEffect, useState } from "react";
import MarkdownEditor, {
  customEditorSettings,
} from "../molecules/editor/MarkdownEditor";

type Props = {};

function Entry({ entry }: { entry: SnapshotModel }) {
  const initialContent = JSON.parse(entry.data);
  const editor = BlockNoteEditor.create({
    ...customEditorSettings,
    initialContent,
  });
  return (
    <article className="mb-4">
      <span className="px-2 py-1 text-xs rounded-full cursor-default select-none text-neutral-600">
        {Intl.DateTimeFormat(undefined, {
          dateStyle: "long",
          timeStyle: "short",
        }).format(new Date(entry.last_modification))}
      </span>
      <div className="pl-16 mt-2 bg-white rounded-xl">
        <MarkdownEditor
          onChange={({ blocks }) => {
            updateOrCreateSnapshot(entry.id, JSON.stringify(blocks));
          }}
          editor={editor as any}
        />
      </div>
    </article>
  );
}

const Entries = (props: Props) => {
  const [entries, setEntries] = useState<SnapshotModel[]>([]);
  useEffect(() => {
    getSnapshots().then((snapshots) => {
      console.log("snapshots", snapshots);
      setEntries(snapshots);
    });
  }, []);

  return entries.map((entry, index) => {
    return <Entry key={entry.id} entry={entry} />;
  });
};

export default Entries;
