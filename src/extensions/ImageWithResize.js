// extensions/ImageWithResize.ts
import { Node, mergeAttributes } from "@tiptap/core";

const ImageWithResize = Node.create({
  name: "customImage",

  group: "block",
  inline: false,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: "auto",
      },
      height: {
        default: "auto",
      },
      align: {
        default: "center", // left, center, right
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type='custom-image']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "custom-image",
        style: `display:flex; justify-content: ${
          HTMLAttributes.align || "center"
        };`,
      }),
      [
        "img",
        {
          src: HTMLAttributes.src,
          alt: HTMLAttributes.alt,
          style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`,
        },
      ],
    ];
  },

  addCommands() {
    return {
      insertImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default ImageWithResize;
