export const getCourseImageUrl = (thumbnail, baseUrl) => {
  if (!thumbnail) return "/placeholder-course.jpg";
  const base = String(baseUrl || "").replace(/\/+$/, "");
  const path = String(thumbnail).replace(/^\/+/, "");
  return `${base}/${path}`;
};
