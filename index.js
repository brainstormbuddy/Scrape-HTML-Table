import axios from "axios";
import cheerio from "cheerio";
import { renderPage } from "./renderPage.js";
import fs from "fs";

async function fetchData() {
  try {
    const renderedPage = await renderPage();
    const $ = cheerio.load(renderedPage);

    // Get table headers
    const tableHeaders = $(".table-heading")
      .map((index, element) => $(element).text())
      .get();

    // Get table content
    let output = "";

    $(".table-body ul").each((index, element) => {
      const category = $(element).prev().text();
      console.log("\nCategory:", category);

      output += `\nCategory: ${category}\n`;

      const products = $(element)
        .find("li")
        .map((i, el) => {
          const part = $(el).find(".part").text();
          const description = $(el).find(".description").text();
          const price = $(el).find(".price1").text();

          return { part, description, price };
        })
        .get();

      console.log("Products:", products);

      output += `Products: ${JSON.stringify(products)}\n`;
    });

    fs.writeFile("output.txt", output, (err) => {
      if (err) {
        console.error("Error writing to output.txt:", err);
      } else {
        console.log("Output saved to output.txt");
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
