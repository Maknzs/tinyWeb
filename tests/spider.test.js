const { createIndex, getPagesForKeyword } = require("../searchIndex");
const { crawl } = require("../spider");
const nock = require("nock"); // Mock HTTP requests for testing

describe("Spider", () => {
  let index;
  // Initialize a new index before each test
  beforeEach(() => {
    index = createIndex();
  });
  // Test 1: Crawl a single web page and add its content to the index
  it("should crawl a single page and add it to the index", async () => {
    // Mock or provide a simple HTML page for testing
    nock("https://www.example.com")
      .get("/")
      .reply(
        200,
        "<html><body>This is a page about cats and dogs.</body></html>"
      );
    await crawl("https://www.example.com", index);
    // Assert that the index contains information from the crawled page
    const results = getPagesForKeyword(index, "cats");
    expect(results).toContain("https://www.example.com");
  });
  // Test 2: Follow links and crawl multiple pages
  it("should follow links and crawl multiple pages", async () => {
    // Mock or provide HTML pages with links for testing
    nock("https://www.example.com")
      .get("/")
      .reply(
        200,
        '<html><body>This is the homepage. <a href="/about">About</a></body></html>'
      );
    nock("https://www.example.com")
      .get("/about")
      .reply(200, "<html><body>This is the about page.</body></html>");
    await crawl("https://www.example.com", index);
    // Assert that the index contains information from multiple crawled pages
    const homeResults = getPagesForKeyword(index, "homepage");
    const aboutResults = getPagesForKeyword(index, "about");
    expect(homeResults).toContain("https://www.example.com");
    expect(aboutResults).toContain("https://www.example.com/about");
  });
  // Test 3: Respect robots.txt and avoid disallowed paths
  it("should respect robots.txt and avoid disallowed paths", async () => {
    // Mock a robots.txt file and HTML pages for testing
    nock("https://www.example.com")
      .get("/robots.txt")
      .reply(200, "User-agent: *\nDisallow: /private");
    nock("https://www.example.com")
      .get("/")
      .reply(
        200,
        '<html><body>This is the homepage. <a href="/private">Private</a></body></html>'
      );
    nock("https://www.example.com")
      .get("/private")
      .reply(200, "<html><body>This is the private page</body></html>");
    await crawl("https://www.example.com", index);
    // Assert that the spider did not attempt to crawl disallowed paths
    const homeResults = getPagesForKeyword(index, "homepage");
    const privateResults = getPagesForKeyword(index, "private");
    expect(homeResults).toContain("https://www.example.com");
    // Ensure that the /private page is NOT indexed, but it may not be empty
    // because of the word private on the homepage
    expect(privateResults).not.toContain("https://www.example.com/private");
  });
  // Add more test cases to cover other scenarios and edge cases
});
