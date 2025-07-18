"use client";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Color from "@tiptap/extension-color";
import HardBreak from "@tiptap/extension-hard-break";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useRef, useEffect } from "react";
import { Mark, Node, mergeAttributes } from "@tiptap/core";
import { NodeViewRendererProps } from "@tiptap/core";
import {
  NodeViewWrapper,
  NodeViewContent,
  ReactNodeViewRenderer,
} from "@tiptap/react";

const FontFamily = Mark.create({
  name: "fontFamily",

  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.style.fontFamily || null,
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return {
            style: `font-family: ${attributes.style}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: "font-family",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontFamily:
        (font) =>
        ({ chain }) => {
          return chain().setMark("fontFamily", { style: font }).run();
        },
    };
  },
});

const FontSize = Mark.create({
  name: "fontSize",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        style: "font-size",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return {
            style: `font-size: ${attributes.style}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain }) => {
          return chain().setMark("fontSize", { style: size }).run();
        },
    };
  },
});

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {};
          }

          return {
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
      borderColor: {
        default: null,
        parseHTML: (element) => element.style.borderColor || null,
        renderHTML: (attributes) => {
          if (!attributes.borderColor) return {};
          return {
            style: `border: 1px solid ${attributes.borderColor}`,
          };
        },
      },
    };
  },
});

const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (el) => el.style.backgroundColor || null,
        renderHTML: (attrs) =>
          attrs.backgroundColor
            ? {
                style: `background-color: ${attrs.backgroundColor}`,
              }
            : {},
      },
      borderColor: {
        default: null,
        parseHTML: (el) => el.style.borderColor || null,
        renderHTML: (attrs) =>
          attrs.borderColor
            ? {
                style: `border: 1px solid ${attrs.borderColor}`,
              }
            : {},
      },
    };
  },
});

const ImageComponent = ({ node, updateAttributes, selected }) => {
  const { src, alt, width, height, align } = node.attrs;
  const imgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const onMouseDown = (e) => {
    e.preventDefault();
    if (!imgRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setStartWidth(imgRef.current.offsetWidth);
  };

  const onMouseMove = (e) => {
    if (!isDragging || !imgRef.current) return;
    const diff = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + diff);
    updateAttributes({ width: `${newWidth}px` });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <NodeViewWrapper
      as="div"
      data-type="custom-image"
      style={{
        display: "flex",
        justifyContent:
          align === "left"
            ? "flex-start"
            : align === "right"
            ? "flex-end"
            : "center",
        margin: "0.5rem 0",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          style={{
            width,
            height,
            maxWidth: "100%",
            border: selected ? "2px solid #2684FF" : "none",
            transition: "width 0.05s linear",
          }}
        />
        {selected && (
          <div
            style={{
              position: "absolute",
              right: -6,
              bottom: -6,
              width: 12,
              height: 12,
              background: "#2684FF",
              borderRadius: "50%",
              cursor: "ew-resize",
              zIndex: 10,
            }}
            onMouseDown={onMouseDown}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
};

const ImageWithResize = Node.create({
  name: "customImage",

  group: "block",
  inline: false,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: "300px" },
      height: { default: "auto" },
      align: { default: "center" },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='custom-image']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "custom-image",
        style: `
        display: flex;
        justify-content: ${HTMLAttributes.align || "center"};
        margin: 1rem 0;
      `,
      }),
      [
        "img",
        {
          src: HTMLAttributes.src,
          alt: HTMLAttributes.alt,
          style: `
          width: ${HTMLAttributes.width};
          height: ${HTMLAttributes.height};
          max-width: 100%;
          display: block;
        `,
        },
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },

  addCommands() {
    return {
      insertImage:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
    };
  },
});

const initHeadingOptions = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading1", label: "Heading 1" },
  { value: "heading2", label: "Heading 2" },
  { value: "heading3", label: "Heading 3" },
  { value: "heading4", label: "Heading 4" },
  { value: "heading5", label: "Heading 5" },
  { value: "heading6", label: "Heading 6" },
];

const initFontSizeOptions = [
  { value: "12px", label: "12px" },
  { value: "14px", label: "14px" },
  { value: "16px", label: "16px" },
  { value: "20px", label: "20px" },
  { value: "24px", label: "24px" },
  { value: "32px", label: "32px" },
];

const initFontFamilyOption = [
  { value: "Arial", label: "Arial" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "Verdana", label: "Verdana" },
  { value: "Kanit, sans-serif", label: "Kanit" },
  { value: "Prompt, sans-serif", label: "Prompt" },
  { value: "IBM Plex Sans, sans-serif", label: "IBM Plex Sans" },
];

const extensions = [
  StarterKit,
  Underline,
  Strike,
  Highlight,
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  Link,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  HorizontalRule,
  HardBreak,
  Subscript,
  Superscript,
  ImageWithResize,
];

export default function useBlogger() {
  const [className, onSetClassName] = useState("editor-content");

  const headingOptions = initHeadingOptions;
  const fontSizeOptions = initFontSizeOptions;
  const fontFamilyOption = initFontFamilyOption;

  const optionList = { headingOptions, fontSizeOptions, fontFamilyOption };

  const [initHtmlContent, onSetInitHtmlContent] = useState(
    "<p>Write your content here...</p>"
  );

  const editor = useEditor({
    extensions,
    content: initHtmlContent,
  });

  const onResetContent = () => {
    editor?.commands.setContent("<p>Write your content here...</p>");
    onSetInitHtmlContent("<p>Write your content here...</p>");
  };

  // useAction
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleSubscript = () => editor.chain().focus().toggleSubscript().run();
  const toggleSuperscript = () =>
    editor.chain().focus().toggleSuperscript().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleHighlight = () => editor.chain().focus().toggleHighlight().run();
  const setHorizontalRule = () =>
    editor.chain().focus().setHorizontalRule().run();
  const setColor = (color = "#e74c3c") =>
    editor.chain().focus().setColor(color).run();
  const setTextAlignLeft = () =>
    editor.chain().focus().setTextAlign("left").run();
  const setTextAlignCenter = () =>
    editor.chain().focus().setTextAlign("center").run();
  const setTextAlignRight = () =>
    editor.chain().focus().setTextAlign("right").run();
  const setTextAlignJustify = () =>
    editor.chain().focus().setTextAlign("justify").run();
  const setLink = (href = "#", target = "_blank") =>
    editor.chain().focus().setLink({ href, target }).run();
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const sinkListItem = () => editor.commands.sinkListItem("listItem");
  const liftListItem = () => editor.commands.liftListItem("listItem");
  const setParagraph = () => editor.chain().focus().setParagraph().run();
  const setHeading = (level = 1) =>
    editor.chain().focus().setHeading({ level }).run();
  const setFontSize = (size = "16px") =>
    editor.chain().focus().setFontSize(size).run();
  const setFontFamily = (font = "IBM Plex Sans, sans-serif") =>
    editor.chain().focus().setFontFamily(font).run();
  const undo = () => editor?.chain().focus().undo().run();
  const redo = () => editor?.chain().focus().redo().run();
  const resetAttributes = () => editor?.chain().focus().resetAttributes().run();
  const getJSON = () => editor?.getJSON();
  const getText = () => editor?.getText();
  const getHTML = () => editor?.getHTML();

  const insertImage = ({
    src,
    alt = "",
    width = "300px",
    height = "auto",
    align = "center",
  }) => {
    return editor
      ?.chain()
      .focus()
      .insertImage({ src, alt, width, height, align })
      .run();
  };

  const alignSelectedImage = (align = "center") => {
    const { state, view } = editor;
    const { selection } = state;
    const { from } = selection;

    const node = state.doc.nodeAt(from);

    if (node?.type.name === "customImage") {
      editor.commands.updateAttributes("customImage", { align });
    }
  };

  const preview = (
    <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() }} />
  );

  const useAction = {
    onResetContent,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleSubscript,
    toggleSuperscript,
    toggleStrike,
    toggleHighlight,
    setHorizontalRule,
    setColor,
    setTextAlignLeft,
    setTextAlignCenter,
    setTextAlignRight,
    setTextAlignJustify,
    setLink,
    toggleBulletList,
    toggleOrderedList,
    sinkListItem,
    liftListItem,
    setParagraph,
    setHeading,
    setFontSize,
    setFontFamily,
    undo,
    redo,
    resetAttributes,
    getJSON,
    getText,
    getHTML,
    insertImage,
    alignSelectedImage,
  };
  const EditorZone = <EditorContent editor={editor} className={className} />;

  return {
    useAction,
    optionList,
    preview,
    EditorZone,
    onSetClassName,
    onSetInitHtmlContent,
  };
}
