const dealWithApi = require("./contraller/dealWithApi");
const chalk = require("chalk");
const http = require("http");
// const url = "http://jsonplaceholder.typicode.com/users";
const yargs = require("yargs");
const { argv } = require("process");
yargs.command({
  command: "http",
  builder: {
    api: { demandOption: true },
  },
  handler: function (argv) {
   (dealWithJson.showDataFromApi(argv.api)); 
  },
});
yargs.argv;
