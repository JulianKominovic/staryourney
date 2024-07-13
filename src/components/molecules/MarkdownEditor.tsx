import { AffineEditorContainer } from "@blocksuite/presets";
import { Doc, Schema, Y } from "@blocksuite/store";
import { DocCollection } from "@blocksuite/store";
import { AffineSchemas } from "@blocksuite/blocks";
import "@blocksuite/presets/themes/affine.css";
import { createContext, useContext } from "react";
import { useEffect, useRef } from "react";
import { NoteDisplayMode } from "@blocksuite/blocks";

export const EditorContext = createContext<{
  editor: AffineEditorContainer;
  collection: DocCollection;
} | null>(null);

export function useEditor() {
  return useContext(EditorContext);
}

export interface EditorContextType {
  editor: AffineEditorContainer | null;
  collection: DocCollection | null;
  updateCollection: (newCollection: DocCollection) => void;
}

function initEditor() {
  const schema = new Schema().register(AffineSchemas);
  const collection = new DocCollection({ schema });
  collection.meta.initialize();

  const doc = collection.createDoc({ id: "page1" });
  collection.doc.on("subdocs", (subdocs) => {
    subdocs.added.forEach((doc: Y.Doc) => {
      console.log(doc);
    });
  });
  doc.load(() => {
    const pageBlockId = doc.addBlock("affine:page", {});
    const noteId = doc.addBlock("affine:note", {}, pageBlockId);
    doc.addBlock("affine:paragraph", {}, noteId);
  });

  const editor = new AffineEditorContainer();
  editor.doc = doc;
  return { editor, collection };
}

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const { editor, collection } = initEditor();
  return (
    <EditorContext.Provider value={{ editor, collection }}>
      {children}
    </EditorContext.Provider>
  );
};

const Editor = () => {
  const { editor } = useEditor()!;
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorContainerRef.current && editor) {
      editorContainerRef.current.innerHTML = "";
      editorContainerRef.current.appendChild(editor);
    }
  }, [editor]);

  return (
    <div
      style={{
        "--affine-background-primary-color": "rgba(255,255,255,0.3)",
      }}
      className="editor-container [&__doc-title]:hidden [&__doc-meta-tags]:hidden [&__\.affine-page-root-block-container]:bg-transparent [&__page-editor]:mb-20 [&__page-editor]:mt-20 [&__page-editor]:rounded-xl [&__.affine-page-root-block-container]:px-8"
      ref={editorContainerRef}
    ></div>
  );
};

export default Editor;
