const fs = require("fs/promises");
const path = require("path");

const folderPath = path.join(__dirname, "/secret-folder");

fs.readdir(folderPath, { withFileTypes: true })
  .then((files) => {
    const filteredFiles = files.filter((file) => file.isFile());

    filteredFiles.forEach(async (file) => {
      const fileExtension = path.extname(file.name);
      const filePath = path.join(folderPath, file.name);
      const fileStats = await fs.stat(filePath);
      const fileSize = fileStats.size / 1000;
      const fileName = path.basename(file.name, path.extname(file.name));
      console.log(
        `${fileName} - ${fileExtension.slice(1)} - ${fileSize.toFixed(2)}kb`
      );
    });
  })
  .catch((err) => console.error(err));
