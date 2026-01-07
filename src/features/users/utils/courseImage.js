import placeholderImg from "@/assets/image.svg";

export const getCourseImageUrl = (thumbnail, baseUrl) => {
  if (!thumbnail) return placeholderImg;
  const base = String(baseUrl || "").replace(/\/+$/, "");
  const path = String(thumbnail).replace(/^\/+/, "");
  return `${base}/${path}`;
};
