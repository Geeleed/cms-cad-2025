export const fetchGetJson = async ({ url, options = {}, nextOptions = {} }) =>
  await fetch(url, {
    ...options,
    next: { ...nextOptions },
  }).then((r) => r.json());
