const { createIndex, addPageToIndex } = require("../searchIndex");
const { search } = require("../searchAlgorithm");
const { rankSearchResults } = require("../rankingAlgorithm");

describe("Ranking Algorithm", () => {
  let index;
  beforeEach(() => {
    index = createIndex();
    // Populate the index with sample data, ensuring variations in keyword frequency and location
    addPageToIndex(
      index,
      "https://www.example.com/cats",
      "This is a page about cats. Cats are great"
    );
    addPageToIndex(
      index,
      "https://www.example.com/dogs",
      "This is a page about dogs and learning"
    );
    addPageToIndex(
      index,
      "https://www.example.com/cats-and-dogs",
      "This is a page about both cats and dogs. I love both, but especially dogs"
    );
    addPageToIndex(
      index,
      "https://www.example.com/ml",
      "This is a page about machine learning"
    );
  });
  // Test 1: Rank results by keyword frequency
  it("should rank results based on keyword frequency", () => {
    // Add pages to the index with varying keyword frequencies
    const searchResults = search(index, "cats");
    // Assuming you have the 'search' function from the Search Algorithm component
    const rankedResults = rankSearchResults(index, "cats", searchResults);
    // Assert that the page with higher keyword frequency is ranked first
    expect(rankedResults[0]).toBe("https://www.example.com/cats");
    expect(rankedResults[1]).toBe("https://www.example.com/cats-and-dogs");
  });
  // Test 2: Rank results by multiple keyword matches
  it("should rank pages with more keyword matches higher", () => {
    const searchResults = search(index, "cats dogs");
    const rankedResults = rankSearchResults(index, "cats dogs", searchResults);
    expect(rankedResults[0]).toBe("https://www.example.com/cats-and-dogs");
    expect(rankedResults[1]).toBe("https://www.example.com/cats");
    expect(rankedResults[2]).toBe("https://www.example.com/dogs");
  });
  // Test 3: Handle cases with no matches
  it("should return an empty array if there are no matches", () => {
    const searchResults = search(index, "birds"); // No search results for 'birds'
    const rankedResults = rankSearchResults(index, "birds", searchResults);
    expect(searchResults).toEqual([]); // No matches for 'birds'
    expect(rankedResults).toEqual([]); // No matches for 'birds'
  });
  // Test 4: Handle ties in ranking.
  it("should handle ties in ranking", () => {
    const searchResults = search(index, "learning"); // Should return two pages
    const rankedResults = rankSearchResults(index, "learning", searchResults);
    // A tie happens in scores so rankSearchResults does not change the order
    expect(rankedResults).toEqual(searchResults);
  });
  // Add more test cases to cover other ranking factors
});
