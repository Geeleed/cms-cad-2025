import { Mark, mergeAttributes } from "@tiptap/core";

export const FontFamily = Mark.create({
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
