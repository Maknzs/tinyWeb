const {
  createIndex,
  addPageToIndex,
  updatePageInIndex,
  removePageFromIndex,
  getPagesForKeyword,
} = require("../searchIndex"); // Assuming your code is in a file named 'searchIndex.js'

describe("Search Index", () => {
  let index;
  beforeEach(() => {
    index = createIndex();
  });
  // Scenario 1: Adding a new page
  it("should add a new page to the index", () => {
    addPageToIndex(
      index,
      "https://www.example.com",
      "This is a sample web page about dogs"
    );
    expect(getPagesForKeyword(index, "dogs")).toContain(
      "https://www.example.com"
    );
  });
  // Scenario 2: Updating a page
  it("should update a page in the index", () => {
    addPageToIndex(
      index,
      "https://www.example.com",
      "This is a sample web page about dogs"
    );
    updatePageInIndex(
      index,
      "https://www.example.com",
      "This is a sample web page about cats"
    );
    expect(getPagesForKeyword(index, "dogs")).not.toContain(
      "https://www.example.com"
    );
    expect(getPagesForKeyword(index, "cats")).toContain(
      "https://www.example.com"
    );
  });
  // Scenario 3: Removing a page
  it("should remove a page from the index", () => {
    addPageToIndex(
      index,
      "https://www.example.com",
      "This is a sample web page about cats"
    );
    removePageFromIndex(index, "https://www.example.com");
    expect(getPagesForKeyword(index, "cats")).not.toContain(
      "https://www.example.com"
    );
  });
  // Scenario 4: Searching for a keyword
  it("should return relevant pages for a keyword", () => {
    addPageToIndex(
      index,
      "https://www.example.com",
      "This is a sample web page about cats"
    );
    expect(getPagesForKeyword(index, "cats")).toContain(
      "https://www.example.com"
    );
  });
  // Additional test cases to consider:
  // Edge case 1: Handling multiple pages with the same keyword
  it("should handle multiple pages with the same keyword", () => {
    addPageToIndex(
      index,
      "https://www.example.com/page1",
      "This page is about cats"
    );
    addPageToIndex(
      index,
      "https://www.example.com/page2",
      "Another page about cats"
    );
    const results = getPagesForKeyword(index, "cats");
    expect(results).toContain("https://www.example.com/page1");
    expect(results).toContain("https://www.example.com/page2");
  });
  // Edge case 2: Handling case sensitivity in keyword matching
  it("should be case insensitive in keyword matching", () => {
    addPageToIndex(
      index,
      "https://www.example.com",
      "This is a page about CATS"
    );
    expect(getPagesForKeyword(index, "cats")).toContain(
      "https://www.example.com"
    ); // searching in lowercase
    expect(getPagesForKeyword(index, "Cats")).toContain(
      "https://www.example.com"
    ); // searching in title case
    expect(getPagesForKeyword(index, "CATS")).toContain(
      "https://www.example.com"
    ); // searching in upper case
  });
  // Edge case 3: Handling invalid URLs
  it("should not add invalid URLs to the index gracefully", () => {
    addPageToIndex(index, "", "This is a page about cats"); // Adding with an invalid URL
    const results = getPagesForKeyword(index, "cats");
    expect(results).not.toContain(""); // URL should not be included as it is empty
  });
  // Edge case 4: Handling empty page content
  it("should handle empty page content gracefully", () => {
    addPageToIndex(index, "https://www.example.com/empty", ""); // Adding empty content
    const results = getPagesForKeyword(index, ""); // Should return an empty array for an empty keyword
    expect(results).toEqual([]);
  });
  // Edge case 5: Handle searching for numbers
  it("should handle searching for numbers", () => {
    addPageToIndex(
      index,
      "https://www.example.com/nums",
      "This is a page about numbers, 1, 2, 10, 13"
    );
    // Generally we can expect that keywords are always passed in as strings
    const results = getPagesForKeyword(index, "13");
    expect(results).toContain("https://www.example.com/nums");
  });
  // Edge case 6: Handle duplicate entries in index
  it("should not have duplicate urls in the index", () => {
    addPageToIndex(
      index,
      "https://www.example.com/nums",
      "This is a page about numbers, 1, 2, 10, 13"
    );
    addPageToIndex(
      index,
      "https://www.example.com/nums",
      "This is a page about numbers, 1, 2, 10, 13"
    );
    const results = getPagesForKeyword(index, "13");
    const hasDistinctURLs = (urls) => {
      const urlsSet = new Set(urls);
      return urlsSet.size === urls.length;
    };
    expect(hasDistinctURLs(results)).toBeTruthy();
  });
});
