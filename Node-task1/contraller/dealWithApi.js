const http = require("http");
const showDataFromApi = (url) => {
  const request = http.request(url, (res) => {
    let allData = "";
    res.on("data", (myData) => {
      allData += myData.toString();
    });
    res.on("end", () => {
      console.log(JSON.parse(allData));
    });
  });
  request.on("error", (error) => console.log(error));
  request.end();
};
module.exports = { showDataFromApi };
