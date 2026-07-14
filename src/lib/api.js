// هيلبر بسيط لبناء رابط الـ API بشكل موحد في كل الصفحات
export function apiUrl(path) {
  let baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
