export const createSlug = (str: string, maxLen = 50) => {
  const slug = str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

  if (slug.length > maxLen) {
    const fixedNum =
      slug
        .slice(0, 50)
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
    return slug.slice(0, 50) + "-" + fixedNum;
  }
  return slug;
};
