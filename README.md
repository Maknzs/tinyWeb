# Tiny Web Search Engine

This project is a simple command-line-based web search engine built using Node.js. It allows you to search for web pages based on indexed content and see ranked results according to relevance. 

## Features
- Command-Line Interface (CLI) for searching
- A simple search engine that indexes pages
- Ranking of search results based on relevance
- A spider (web crawler) to gather page content
- Respect for `robots.txt` rules when crawling

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)

## Installation

### 1. Extract the Zip File

After downloading the zip file, extract it to your preferred directory.

### 2. Install Dependencies

Since the `node_modules` folder is not included in the zip file, you'll need to install the required dependencies using npm. After extracting the project, navigate to the project directory using the terminal and run:

```
npm install
```

This command will install all necessary packages and create a `node_modules` directory in your project.

## How to Run the Project

### 1. Run the Command-Line Interface (CLI)

The CLI is the interface to search for web pages using keywords.

1. **Start the CLI**:

   ```
   node cli.js
   ```

2. **Usage**:
   - Once the CLI starts, you will see a prompt (`>`).
   - Enter a search query (for example, `cats`, `dogs`, etc.) to see the relevant pages.
   - To exit the CLI, type `exit`.

#### Example CLI Interaction:

```
$ node cli.js
Welcome to Tiny Web Search Engine!
You can search for pages by typing keywords. Type "exit" to quit.
> cats
Search Results:
1. https://www.example.com/cats
> dogs
Search Results:
1. https://www.example.com/dogs
> exit
Exiting the search engine. Goodbye!
```

### 2. Running Tests

The project includes unit tests for various components such as the search algorithm, ranking algorithm, spider, and the CLI itself.

To run all tests, use the following command:

```
npm test
```

This will execute the test cases in the `tests/` folder and show the results in the terminal.

## Code Structure

- `cli.js`: Command-line interface logic for interacting with the search engine.
- `searchIndex.js`: Handles the creation, updating, and querying of the search index.
- `searchAlgorithm.js`: Implements the search algorithm that retrieves relevant web pages based on a query.
- `rankingAlgorithm.js`: Implements the ranking algorithm that orders search results based on relevance.
- `spider.js`: Implements the spider (web crawler) that crawls web pages and adds their content to the search index.
- `tests/`: Contains unit tests for different components of the project.