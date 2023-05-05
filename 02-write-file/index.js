const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filename = path.join(__dirname, "", "text.txt");

fs.writeFile(filename, "", (err) => {
  if (err) throw err;
  console.log(`Файл ${filename} создан`);

  console.log("Напишите что-то :)");
  rl.setPrompt("Введите текст: ");

  rl.on("line", (input) => {
    if (input === "exit") {
      console.log("\nCпасибо :) Работа завершена");
      process.exit();
    }
    fs.appendFile(filename, `${input}\n`, (err) => {
      if (err) throw err;
      console.log(`Текст добавлен в файл ${filename}`);
      console.log("Для выхода напишите exit или нажмите CTRL + C");
      rl.prompt();
    });
  });

  rl.on("SIGINT", () => {
    console.log("\nCпасибо :) Работа завершена");
    process.exit();
  });
});
