import {
  AddBlockButton,
  DeleteLinkButton,
  DragHandleButton,
  EditLinkButton,
  LinkToolbar,
  LinkToolbarController,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
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

import {
  SideMenuProps,
  useBlockNoteEditor,
  useComponentsContext,
} from "@blocknote/react";
import { Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { OgMetadataModel } from "@/database/og-metadata";
import { getOgInfo } from "@/integration/get-og-info";
import { getAsset } from "@/integration/get-asset";
import { writeBinaryFileToDisk } from "@/integration/filesystem";
import { arrayBufferSha256 } from "@/lib/encoders";

// Custom Side Menu button to remove the hovered block.
export function RemoveBlockButton(props: SideMenuProps) {
  const editor = useBlockNoteEditor();

  const Components = useComponentsContext()!;

  return (
    <Components.SideMenu.Button
      label="Remove block"
      icon={
        <Trash
          size={24}
          onClick={() => {
            editor.removeBlocks([props.block]);
          }}
        />
      }
    />
  );
}

export const customEditorSettings = {
  uploadFile: async (file: File) => {
    console.log(file);
    const arrayBuffer = await file.arrayBuffer();
    const sha = await arrayBufferSha256(arrayBuffer);
    const extension = file.name.split(".").pop();
    const filename = sha + "." + extension;
    await writeBinaryFileToDisk(filename, arrayBuffer);
    return await getAsset(filename);
  },
};

function LinkPreview({ url }: { url: string }) {
  const [ogInfo, setOgInfo] = useState<OgMetadataModel>();
  useEffect(() => {
    getOgInfo(url).then(async (response) => {
      setOgInfo({
        ...response,
        filename: await getAsset(response.filename ?? ""),
      });
    });
  }, [url]);
  if (ogInfo)
    return (
      <div className="w-full h-full p-1 px-2">
        <img
          onError={(e) => {
            e.currentTarget.remove();
          }}
          src={ogInfo.filename}
          alt=""
          className="w-full h-auto mx-auto rounded-md"
        />
        <div className="mt-2 text-base font-bold line-clamp-1">
          {ogInfo.title}
        </div>
        <div className="text-xs text-gray-500 line-clamp-2">
          {ogInfo.description}
        </div>
      </div>
    );
  return <div className="p-4">Loading...</div>;
}

const MarkdownEditor = ({
  onChange,
  editor = useCreateBlockNote(customEditorSettings) as any,
}: Props) => {
  const { debounce } = useDebounceFunction(2000);

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
      sideMenu={false}
      linkToolbar={false}
    >
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu {...props}>
            {/* Button which removes the hovered block. */}
            {/* <AddBlockButton {...props} /> */}
            <RemoveBlockButton {...props} />
            <DragHandleButton {...props} />
          </SideMenu>
        )}
      />
      <LinkToolbarController
        linkToolbar={(props) => {
          return (
            <LinkToolbar {...props}>
              <div className="grid grid-cols-1 grid-rows-[1fr_40px] w-60 max-h-72">
                <LinkPreview url={props.url} />
                <div className="flex pb-0.5 items-center px-1">
                  <EditLinkButton {...props} />
                  <DeleteLinkButton {...props} />
                </div>
              </div>
            </LinkToolbar>
          );
        }}
      ></LinkToolbarController>
    </BlockNoteView>
  );
};

export default MarkdownEditor;
