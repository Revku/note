import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LZString from "lz-string";
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  CreateLink,
  directivesPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export function Editor() {
  const [content, setContent] = useState<string>("");
  const editorRef = useRef<null | MDXEditorMethods>(null);

  useLayoutEffect(() => {
    const windowHash = window.location.hash;
    if (!windowHash) return;

    const decodedNote = LZString.decompressFromEncodedURIComponent(
      windowHash.slice(1),
    );
    setContent(decodedNote);
    editorRef.current?.setMarkdown(decodedNote);
  }, []);

  useEffect(() => {
    if (content.length == 0) return;

    const debounce = setTimeout(() => {
      const hash = LZString.compressToEncodedURIComponent(content);
      window.location.hash = hash;
    }, 500);

    return () => clearTimeout(debounce);
  }, [content]);

  return (
    <div className="h-full">
      <MDXEditor
        ref={editorRef}
        className="dark-theme dark-editor"
        markdown={content}
        placeholder="Enter your note..."
        plugins={[
          headingsPlugin(),
          markdownShortcutPlugin(),
          listsPlugin(),
          thematicBreakPlugin(),
          quotePlugin(),
          tablePlugin(),
          codeBlockPlugin(),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          // toolbarPlugin({
          //   toolbarClassName: "editor-toolbar",
          //   toolbarContents: () => (
          //     <>
          //       <UndoRedo />
          //       <BoldItalicUnderlineToggles />
          //       <BlockTypeSelect />
          //       <ListsToggle />
          //     </>
          //   ),
          // }),
        ]}
        contentEditableClassName="editableMarkdown"
        onChange={setContent}
      />
    </div>
  );
}
