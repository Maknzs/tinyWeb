const { addPageToIndex } = require("./searchIndex");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawl(
  startingURL,
  index,
  robotsTXTs = {},
  visited = new Set(),
  recursionDepth = 5
) {
  try {
    if (recursionDepth <= 0) return;
    if (visited.has(startingURL)) return;
    visited.add(startingURL);
    const parsedURL = new URL(startingURL);
    const urlOrigin = parsedURL.origin;
    if (!robotsTXTs[urlOrigin]) {
      robotsTXTs[urlOrigin] = await fetchRobotsTXT(urlOrigin);
    }
    if (!isAllowedByRobots(robotsTXTs[urlOrigin], parsedURL.pathname)) {
      console.log(`Disallowed by robots.txt: ${startingURL}`);
      return;
    }
    const response = await fetch(startingURL);
    if (!response.ok) {
      throw new Error(`Reaponse status: ${response.status}`);
    }
    const html = await response.text();
    addPageToIndex(index, startingURL, html);
    const links = getLinksFromPage(html, startingURL);
    for (link of links) {
      await crawl(link, index, robotsTXTs, visited, recursionDepth - 1);
    }
  } catch (err) {
    console.error(`Failed to crawl ${startingURL}: ${err.message}`);
  }
}

function getLinksFromPage(htmlText, baseURL) {
  const dom = new JSDOM(htmlText);
  const links = dom.window.document.getElementsByTagName("a");
  return [...links].map((link) => {
    link = link.href;
    if (link && !link.startsWith("http")) {
      link = new URL(link, baseURL).href;
    }
    return link;
  });
}

function isAllowedByRobots(rules, path) {
  return !rules[path];
}

async function fetchRobotsTXT(baseURL) {
  try {
    const robotsURL = `${baseURL}/robots.txt`;
    const response = await fetch(robotsURL);
    const text = await response.text();
    const lines = text.split("\n");
    const disallowedPaths = {};
    let currentUserAgent = "*";
    for (const line of lines) {
      const cleanLine = line.trim().toLowerCase();
      if (cleanLine.startsWith("user-agent")) {
        currentUserAgent = cleanLine.split(":")[1].trim();
      } else if (cleanLine.startsWith("disallow") && currentUserAgent === "*") {
        const path = cleanLine.split(":")[1].trim();
        disallowedPaths[path] = true;
      }
    }
    return disallowedPaths;
  } catch (err) {
    return {};
  }
}

module.exports = {
  crawl,
};
