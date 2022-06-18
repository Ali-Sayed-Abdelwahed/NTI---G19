const fs = require("fs");
class Deal {
    static readDataFromStorage = (filename) => {
        let data;
        try {
            data = JSON.parse(fs.readFileSync(filename));
            if (!Array.isArray(data)) throw new Error("not a array");
        } catch (e) {
            data = [];
        }
        return data;
    };
    //create write to storage
    static writeDataToStorage = (filename, data) => {
        try {
            fs.writeFileSync(filename, JSON.stringify(data));
        } catch (e) { }
    };
}
module.exports = Deal;
