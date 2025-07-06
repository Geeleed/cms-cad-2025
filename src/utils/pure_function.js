export const fetchGetJson = async ({ url }) =>
  await fetch(url).then((r) => r.json());
