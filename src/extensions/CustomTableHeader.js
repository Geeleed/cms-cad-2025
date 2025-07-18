// extensions/CustomTableHeader.js
import TableHeader from "@tiptap/extension-table-header";

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

export default CustomTableHeader;
