const {
    createIndex,
    addPageToIndex,
    updatePageInIndex,
    removePageFromIndex,
    getPagesForKeyword
} = require('../searchIndex'); // Assuming your code is in a file named 'searchIndex.js'

describe('Search Index', () => {
    let index;
    beforeEach(() => {
        index = createIndex();
    });
    // Scenario 1: Adding a new page
    it('should add a new page to the index', () => {
        addPageToIndex(index, 'https://www.example.com', 'This is a sample web page about dogs');
        expect(getPagesForKeyword(index, 'dogs')).toContain('https://www.example.com');
    });
    // Scenario 2: Updating a page
    it('should update a page in the index', () => {
        addPageToIndex(index, 'https://www.example.com', 'This is a sample web page about dogs');
        updatePageInIndex(index, 'https://www.example.com', 'This is a sample web page about cats');
        expect(getPagesForKeyword(index, 'dogs')).not.toContain('https://www.example.com');
        expect(getPagesForKeyword(index, 'cats')).toContain('https://www.example.com');
    });
    // Scenario 3: Removing a page
    it('should remove a page from the index', () => {
        addPageToIndex(index, 'https://www.example.com', 'This is a sample web page about cats');
        removePageFromIndex(index, 'https://www.example.com');
        expect(getPagesForKeyword(index, 'cats')).not.toContain('https://www.example.com');
    });
    // Scenario 4: Searching for a keyword
    it('should return relevant pages for a keyword', () => {
        addPageToIndex(index, 'https://www.example.com', 'This is a sample web page about cats');
        expect(getPagesForKeyword(index, 'cats')).toContain('https://www.example.com');
    });
    // Additional test cases to consider:
    // - Handling multiple pages with the same keyword
    // - Handling case sensitivity (or insensitivity) in keyword matching 
    // - Handling empty page content or invalid URLs
    // - ... (Add more test cases as needed based on the project requirements and potential edge cases)
});