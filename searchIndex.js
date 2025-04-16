// Search Index

function createIndex() {
  return {};
}

function addPageToIndex(index, url, pageContent) {
  // Check for invalid or empty URLs
  if (!url || typeof url !== "string" || url.trim() === "") {
    return; //Don't add page if URL us invalid MAYBE WE THROW AN ERROR LATER??
  }
  // Extract keywords from the page content
  const keywords = extractKeywords(pageContent);
  // Add the URL to the index for each extracted keyword
  keywords.forEach((keyword) => {
    if (!index[keyword]) {
      index[keyword] = [];
    }
    const alreadyExists = index[keyword].some((page) => page.url === url);
    if (!alreadyExists) {
      index[keyword].push({ url, pageContent });
    }
  });
}

function getPagesForKeyword(index, keyword) {
  return index[keyword.toLowerCase()]?.map((page) => page.url) ?? [];
}

function extractKeywords(pageContent) {
  //Tokenize the words by splitting and converting to lowercase
  const words = pageContent.toLowerCase().split(/[^a-z0-9]+/);

  // List of stop words
  const stopWords = ["the", "is", "and", "a", "an", "in", "on", "at", "by"];

  // Filter out stop words & empty strings
  return words.filter((word) => word.length > 1 && !stopWords.includes(word));
}

function updatePageInIndex(index, url, newPageContent) {
  removePageFromIndex(index, url);
  addPageToIndex(index, url, newPageContent);
}

function removePageFromIndex(index, url) {
  Object.keys(index).forEach((keyword) => {
    index[keyword] = index[keyword].filter((page) => page.url !== url);
    // Remove the keyword from the index if no URLs are left
    if (index[keyword].length === 0) {
      delete index[keyword];
    }
  });
}

module.exports = {
  createIndex,
  addPageToIndex,
  getPagesForKeyword,
  updatePageInIndex,
  removePageFromIndex,
};
