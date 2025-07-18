export const fetchGetJson = async ({ url, options = {}, nextOptions = {} }) =>
  await fetch(url, {
    ...options,
    next: { ...nextOptions },
  }).then((r) => r.json());

export const fetchPostJson = async ({
  url,
  payload = {},
  options = {},
  nextOptions = {},
}) =>
  await fetch(url, {
    ...options,
    next: { ...nextOptions },
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json());

export const convertHtmlToText = (content) => {
  if (!content) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  return doc.body.textContent || "";
};

export const convert_rgba_to_hex = ({ r = 0, g = 0, b = 0, a = 1 }) => {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  const alpha = Math.round(a * 255);
  return (
    "#" + toHex(r) + toHex(g) + toHex(b) + (alpha < 255 ? toHex(alpha) : "")
  );
};
