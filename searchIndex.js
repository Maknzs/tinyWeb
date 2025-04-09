// Search Index

function createIndex() {
    return {}
}

function addPageToIndex(index, url, pagecount) {
    // Check for invalid or empty URLs
    if (!url || typeof url !== 'string' || url.trim() === '') {
        return //Don't add page if URL us invalid MAYBE WE THROW AN ERROR LATER??
    }
    // Extract keywords from the page content
    const keywords = extractKeywords(pageContent);
    // Add the URL to the index for each extracted keyword
    keywords.forEach((keyword) => {
        if (!index[keyword]) {
            index[keyword] = [];
        }
        if (!index[keyword].includes(url)) {
            index[keyword].push(url)
        }
    })
}
// TODO: test

function getPagesForKeyword(index, keyword) {
    return index[keyword.toLowerCase()] ?? []
}

function extractKeywords(pageContent) {
    //Tokenize the words by splitting and converting to lowercase
    const words = pageContent.toLowerCase().split(/[^a-z0-9]+/)

    // List of stop words
    const stopWords = ['the', 'is', 'and', 'a', 'an', 'in', 'on', 'at', 'by']

    // Filter out stop words & empty strings
    return words.filter(word => word.length > 1 && !stopWords.includes(word))
}

function updatePageInIndex(inxex, url, newPageContent) {
    removePageFromIndex(index, url, newPageContent)
    addPageToIndex(index, url, newPageContent)
}

function removePageFromIndex(index, url) {
    Object.keys(index).forEach((keyword) => {
        index[keyword] = index[keyword].filter(pageUrl => pageUrl !== url);
        // Remove the keyword from the index if no URLs are left
        if (index[keyword].length === 0) {
            delete index[keyword];
        }
    })
}

modeule.exports = {
    createIndex,
    addPageToIndex,
    getPagesForKeyword,
}