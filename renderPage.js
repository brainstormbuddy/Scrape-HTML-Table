import puppeteer from "puppeteer";

export async function renderPage() {
  // Create a new browser instance
  const browser = await puppeteer.launch({ headless: "new" });

  // Create a new page
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Navigate to the desired URL
  const url = "https://newwayinternational.co.uk/newsletter/";
  await page.goto(url);

  // Wait and click on first result
  const searchResultSelector = ".main-container";
  await page.waitForSelector(searchResultSelector);

  const renderedContent = await page.content();

  // Take a screenshot of the rendered page
  await page.screenshot({ path: "screenshot.png" });

  // Close the browser
  await browser.close();
  return renderedContent;
}
