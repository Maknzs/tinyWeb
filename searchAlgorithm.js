const { getPagesForIndex, getPagesForKeyword } = require("./searchIndex");

function search(index, query) {
  const keywords = query.toLowerCase().split(/[^a-z0-9]+/);
  const results = [];
  keywords.forEach((keyword) => {
    const pages = getPagesForKeyword(index, keyword);
    results.push(...pages);
  });
  return [...new Set(results)];
}

module.exports = {
  search,
};
