const fs = require("fs");
const chalk = require("chalk");
const readData = (filePath) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath));
    if (!Array.isArray(data)) throw new Error("not a array");
    console.log(chalk.green("data featched"));
  } catch (error) {
    data = [];
    console.log(chalk.red("data reseted"));
  }
  return data;
};
const writeData = (filePath, data) => {
  try {
    if (!Array.isArray(data)) throw new Error("");
    fs.writeFileSync(filePath, JSON.stringify(data));
    console.log(chalk.green("data inserted"));
  } catch (error) {
    console.log(chalk.red("invalid data"));
  }
};

module.exports = { readData, writeData };
