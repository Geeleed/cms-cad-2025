import { Mark, mergeAttributes } from "@tiptap/core";

export const FontSize = Mark.create({
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
