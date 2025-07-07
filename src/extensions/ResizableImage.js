// extensions/ResizableImage.js

import { Node, mergeAttributes } from "@tiptap/core";

export const ResizableImage = Node.create({
  name: "resizableImage",

  group: "inline",

  draggable: true,

  selectable: true,

  inline: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "auto",
      },
      height: {
        default: "auto",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="resizable-image"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "resizable-image",
        style: "display: inline-block; position: relative;",
      }),
      [
        "img",
        {
          src: HTMLAttributes.src,
          alt: HTMLAttributes.alt,
          title: HTMLAttributes.title,
          style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height}; display: block;`,
        },
      ],
      [
        "span",
        {
          contenteditable: "false",
          style:
            "position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #000; cursor: se-resize;",
          onmousedown: "handleResizeStart(event)",
        },
      ],
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement("figure");
      dom.setAttribute("data-type", "resizable-image");
      dom.style.position = "relative";
      dom.style.display = "inline-block";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.title = node.attrs.title || "";
      img.style.width = node.attrs.width || "auto";
      img.style.height = node.attrs.height || "auto";
      img.style.display = "block";

      const handle = document.createElement("span");
      handle.contentEditable = "false";
      handle.style.position = "absolute";
      handle.style.bottom = "0";
      handle.style.right = "0";
      handle.style.width = "10px";
      handle.style.height = "10px";
      handle.style.background = "#000";
      handle.style.cursor = "se-resize";

      let startX, startY, startWidth, startHeight;

      const startResize = (event) => {
        event.preventDefault();

        const clientX = event.touches?.[0]?.clientX ?? event.clientX;
        const clientY = event.touches?.[0]?.clientY ?? event.clientY;

        startX = clientX;
        startY = clientY;
        startWidth = img.offsetWidth;
        startHeight = img.offsetHeight;

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);

        document.addEventListener("touchmove", resize, { passive: false });
        document.addEventListener("touchend", stopResize);
      };

      const resize = (event) => {
        const clientX = event.touches?.[0]?.clientX ?? event.clientX;
        const clientY = event.touches?.[0]?.clientY ?? event.clientY;

        const newWidth = startWidth + (clientX - startX);
        const newHeight = startHeight + (clientY - startY);

        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
      };

      const stopResize = () => {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);

        document.removeEventListener("touchmove", resize);
        document.removeEventListener("touchend", stopResize);

        editor.commands.command(({ tr }) => {
          tr.setNodeMarkup(getPos(), undefined, {
            ...node.attrs,
            width: img.style.width,
            height: img.style.height,
          });
          return true;
        });
      };

      handle.addEventListener("mousedown", startResize);
      handle.addEventListener("touchstart", startResize, { passive: false });

      dom.appendChild(img);
      dom.appendChild(handle);

      return {
        dom,
        contentDOM: null,
      };
    };
  },
});
