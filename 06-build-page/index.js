const fs = require("fs").promises;
const path = require("path");

const htmlTemplate = path.join(__dirname, "template.html");
const componentsDir = path.join(__dirname, "components");
const projectDir = path.join(__dirname, "project-dist/");

const stylesFolder = path.join(__dirname, "styles");
const outputFilename = "style.css";

const assetsFolder = path.join(__dirname, "project-dist/assets");
const assetsSource = path.join(__dirname, "assets");

makeDir();
copyAssets(assetsSource, assetsFolder);
replaceTemplateTags();
mergeStyles();

async function makeDir() {
  try {
    await fs.mkdir(projectDir);
    console.log(`Папка project-dist успешно создана`);
  } catch (err) {}
}

async function copyAssets(assetsSource, assetsFolder, topLevel = true) {
  try {
    await fs.mkdir(assetsFolder, { recursive: true });

    const files = await fs.readdir(assetsSource, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(assetsSource, file.name);
      const targetPath = path.join(assetsFolder, file.name);

      if (file.isDirectory()) {
        await copyAssets(sourcePath, targetPath, false);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  } catch (err) {
    console.log(`Ошибка копирования папки ${err}`);
  }
  if (topLevel) {
    console.log(`Все данные папки assets успешно скопированы!`);
  }
}

async function replaceTemplateTags() {
  try {
    let template = await fs.readFile(htmlTemplate, "utf-8");
    const componentFiles = await fs.readdir(componentsDir);

    for (let i = 0; i < componentFiles.length; i++) {
      const filename = componentFiles[i];
      const componentName = filename.split(".")[0];
      const component = await fs.readFile(
        `${componentsDir}/${filename}`,
        "utf-8"
      );

      const tag = new RegExp(`{{${componentName}}}`, "g");
      template = template.replace(tag, component);
    }

    // await fs.mkdir(projectDir);
    await fs.writeFile(`${projectDir}index.html`, template, "utf-8");

    console.log("Файл index.html успешно создан :)");
  } catch (error) {
    console.error(`Ошибка замены шаблонных тегов: ${error}`);
  }
}

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

    const outputPath = path.join(projectDir, outputFilename);
    await fs.writeFile(outputPath, cssContents.join("\n"), "utf-8");

    console.log(`Файл ${outputFilename} успешно создан :)`);
  } catch (err) {
    console.error(err);
  }
}
