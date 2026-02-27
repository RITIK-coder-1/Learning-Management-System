/* ----------------------------------------------------------------------------------------------
slugify.js
This utility is used to convert any text into slugs for URL parameters
------------------------------------------------------------------------------------------------- */

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export default slugify;
