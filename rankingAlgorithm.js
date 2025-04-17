// Function to rank search results based on relevance to the query
function rankSearchResults(index, query, searchResults) {
  // Step 1: process the query and split into keywords
  const keywords = query.toLowerCase().split(/[^a-z0-9]+/);
  // Step 2: Calculate relevance score for each search result (URL)
  const pagesScored = searchResults.map((url) => {
    const relevanceScore = calculateRelvance(index, url, keywords);
    return { url, score: relevanceScore };
  });
  // Step 3: Sort list of pages by their score in descending order
  pagesScored.sort((a, b) => b.score - a.score);
  // Step 4: Return the ranked URLs
  console.log(pagesScored);
  return pagesScored.map((page) => page.url);
}
// Function to calculate the relevance score for a URL based on the query keywords
function calculateRelvance(index, url, keywords) {
  let score = 0;
  keywords.forEach((keyword) => {
    const chosenPage = index[keyword].find((page) => page.url === url);
    // Grab pageContent and make it lowercase for matching keywords
    const content = chosenPage?.pageContent.toLowerCase() ?? "";
    // Make a regex to search for keyword globally
    const reg = new RegExp(keyword, "g");
    // Count number of matches of keyword in the pageContent
    const numMatches = content.match(reg)?.length ?? 0;
    // Add that number of matches to the score
    score += numMatches;
  });
  return score;
}

module.exports = {
  rankSearchResults,
};
