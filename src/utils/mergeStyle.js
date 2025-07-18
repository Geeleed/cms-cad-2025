export function mergeStyleToCurrentCell(editor, newStyle) {
  const node = editor.state.selection.$anchor.node();
  const currentStyle = node.attrs?.style || "";

  // แปลง style string → object
  const styleObj = currentStyle.split(";").reduce((acc, part) => {
    const [key, val] = part.split(":").map((s) => s?.trim());
    if (key && val) acc[key] = val;
    return acc;
  }, {});

  // รวม style
  const merged = { ...styleObj, ...newStyle };

  // แปลงกลับเป็น string
  const mergedStyleString = Object.entries(merged)
    .map(([k, v]) => `${k}: ${v}`)
    .join("; ");

  editor
    .chain()
    .focus()
    .updateAttributes(node.type.name, {
      style: mergedStyleString,
    })
    .run();
}
