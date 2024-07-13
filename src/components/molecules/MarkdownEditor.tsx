import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useDebounceFunction } from "@/lib/debounceFn";
import {
  Block,
  BlockConfig,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";

type Props = {
  onChange?: (value: {
    blocks: Block<
      Record<string, BlockConfig>,
      InlineContentSchema,
      StyleSchema
    >[];
  }) => void;
  editor?: ReturnType<typeof useCreateBlockNote>;
};

const MarkdownEditor = ({ onChange, editor = useCreateBlockNote() }: Props) => {
  const { debounce } = useDebounceFunction(1000);

  return (
    <BlockNoteView
      onChange={() => {
        if (onChange)
          debounce(async () => {
            const doc = editor.document;
            onChange({ blocks: doc });
          });
      }}
      theme={"light"}
      editor={editor}
    />
  );
};

export default MarkdownEditor;
