export function normalizeUrl(url: string): string {
  const urlObject = new URL(url);
  const parts = [
    urlObject.host,
    urlObject.pathname,
    urlObject.search,
    urlObject.hash
  ].map(item => item.replace(/\/\//, "/"));
  return `${urlObject.protocol}//${parts.join("")}`;
}
