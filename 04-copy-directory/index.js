const path = require("path");
const { promises: fsPromises } = require("fs");

async function copyDir() {
  const sourceDir = path.join(__dirname, "files");
  const targetDir = path.join(__dirname, "files-copy");

  await fsPromises.mkdir(targetDir, { recursive: true });

  const files = await fsPromises.readdir(sourceDir, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file.name);
    const targetPath = path.join(targetDir, file.name);

    await fsPromises.copyFile(sourcePath, targetPath);
  }
}

copyDir()
  .then(() => {
    console.log("Все файлы скопированы!");
  })
  .catch((err) => {
    console.error("Ошибка копирования файлов:", err);
  });
