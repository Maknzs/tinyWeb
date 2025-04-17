const { addPageToIndex } = require("./searchIndex");

async function crawl(startingURL, index) {
  try {
    const response = await fetch(startingURL);
    if (!response.ok) {
      throw new Error(`Reaponse status: ${response.status}`);
    }
    const html = await response.text();
    addPageToIndex(index, startingURL, html);
  } catch (err) {
    console.err(`Failed to crawl ${startingURL}: ${err.message}`);
  }
}

module.exports = {
  crawl,
};
