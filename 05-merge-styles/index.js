const fs = require("fs").promises;
const path = require("path");

const stylesFolder = path.join(__dirname, "/styles");
const distFolder = path.join(__dirname, "/project-dist/");
const outputFilename = "bundle.css";

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesFolder);

    const cssFiles = files.filter(
      (filename) => path.extname(filename).toLowerCase() === ".css"
    );

    const cssContents = [];

    for (const filename of cssFiles) {
      const filePath = path.join(stylesFolder, filename);
      const contents = await fs.readFile(filePath, "utf-8");
      cssContents.push(contents);
    }

    const outputPath = path.join(distFolder, outputFilename);
    await fs.writeFile(outputPath, cssContents.join("\n"), "utf-8");

    console.log(`Файл ${outputFilename} успешно создан`);
  } catch (err) {
    console.error(err);
  }
}

mergeStyles();
