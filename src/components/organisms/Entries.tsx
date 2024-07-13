import {
  getSnapshots,
  SnapshotModel,
  updateOrCreateSnapshot,
} from "@/database/editor";
import { cn } from "@/lib/utils";
import { BlockNoteEditor } from "@blocknote/core";
import { useBlockNoteEditor } from "@blocknote/react";
import React, { useEffect, useState } from "react";
import MarkdownEditor from "../molecules/MarkdownEditor";

type Props = {};

function Entry({ entry }: { entry: SnapshotModel }) {
  const initialContent = JSON.parse(entry.data);
  const editor = BlockNoteEditor.create({ initialContent });
  return (
    <article className="mb-4">
      <span>{entry.last_modification}</span>
      <MarkdownEditor
        onChange={({ blocks }) => {
          updateOrCreateSnapshot(entry.id, JSON.stringify(blocks));
        }}
        editor={editor as any}
      />
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
