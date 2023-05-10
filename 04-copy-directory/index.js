const path = require("path");
const fs = require("fs").promises;

async function copyDir() {
  const sourceDir = path.join(__dirname, "files");
  const targetDir = path.join(__dirname, "files-copy");

  try {
    await fs.mkdir(targetDir, { recursive: true });

    const existingFiles = await fs.readdir(targetDir);

    for (const file of existingFiles) {
      const filePath = path.join(targetDir, file);
      await fs.unlink(filePath);
    }

    const files = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const targetPath = path.join(targetDir, file.name);

      await fs.copyFile(sourcePath, targetPath);
    }
    console.log("Все файлы скопированы!");
  } catch (err) {
    console.error("Ошибка копирования файлов:", err);
  }
}

copyDir();
