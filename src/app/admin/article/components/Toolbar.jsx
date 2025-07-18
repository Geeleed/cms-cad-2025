import { parseStyleString, toStyleString } from "@/utils/styleUtils";

export default function Toolbar({ editor }) {
  const updateTextColor = (color) => {
    const node = editor.state.selection.$from.node();
    const currentStyle = node.attrs?.style || "";

    const styleObj = parseStyleString(currentStyle);
    const merged = { ...styleObj, color };
    const newStyle = toStyleString(merged);

    editor.commands.updateAttributes(node.type.name, {
      style: newStyle,
    });
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={() => updateTextColor("red")}>สีแดง</button>
      <button onClick={() => updateTextColor("blue")}>สีน้ำเงิน</button>
    </div>
  );
}
