export function parseStyleString(style = "") {
  return Object.fromEntries(
    style
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const [key, value] = s.split(":");
        return [key.trim(), value.trim()];
      })
  );
}

export function toStyleString(styleObj = {}) {
  return Object.entries(styleObj)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}
