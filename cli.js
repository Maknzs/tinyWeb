const readline = require("readline");
const { createIndex, addPageToIndex } = require("./searchIndex");
const { search } = require("./searchAlgorithm");
const { rankSearchResults } = require("./rankingAlgorithm");

// Initialize the search index
const index = createIndex();

// Mocked data to add to index
function populateIndexWithMockData() {
  // Add Mock pages to the index for testing
  addPageToIndex(
    index,
    "https://www.example.com/cats",
    "This is a page about cats."
  );
  addPageToIndex(
    index,
    "https://www.example.com/dogs",
    "This is a page about dogs."
  );
  addPageToIndex(
    index,
    "https://www.example.com/birds",
    "This is a page about birds."
  );
}

// TODO: replace this mock data call with a call to the spider
// Populate the index
populateIndexWithMockData();

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ", // This will show the prompt symbol
});

// Function to process user queries
function handleUserQuery(query) {
  if (query.toLowerCase() === "exit") {
    console.log("Exiting the search engine. Goodbye!!");
    rl.close(); // Close the CLI gracefully
    return;
  }
  // Run the search algorithm
  const searchResults = search(index, query);
  // Rank the search results
  const rankedResults = rankSearchResults(index, query, searchResults);
  // Display the results
  if (rankedResults.length > 0) {
    console.log("Search results:");
    rankedResults.forEach((pageURL, index) => {
      console.log(`${index + 1}. ${pageURL}`);
    });
  } else {
    console.log("No results found for that query.");
  }

  // Prompt for the next input
  rl.prompt();
}

// Welcome message
console.log("Welcome to Tiny Web Search Engine!");
console.log("You can search for pages by typing keywords.");
console.log('You can type "exit" to quit.');

// Start the command line interface and handle user input
rl.prompt(); // Start showing the prompt symbol
rl.on("line", (input) => {
  // Process user input and remove any extra spaces
  handleUserQuery(input.trim());
});
