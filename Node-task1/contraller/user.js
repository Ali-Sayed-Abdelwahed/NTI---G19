const chalk = require("chalk");
const short = require("short-uuid");
// const { v4: uuidv4 } = require("uuid");
const dealWithJson = require("./dealWithJson");
let dataFile = "database/data.json";
//addUser
const addUser = (name, email, age) => {
  const user = { id: short.generate(), name, email, age };
  const allData = dealWithJson.readData(dataFile);
  allData.push(user);
  dealWithJson.writeData(dataFile, allData);
};
//read all
const readAll = () => {
  const allData = dealWithJson.readData(dataFile);
  allData.forEach((u) => {
    console.log(
      `Id: ${u.id} - Name: ${u.name} - Email: ${u.email} - Age: ${u.age}`
    );
    console.log(
      chalk.green(
        "************************************************************"
      )
    );
  });
};
//single user
const singleUser = (id) => {
  const allData = dealWithJson.readData(dataFile);
  const user = allData.find((u) => u.id == id);
  if (!user) console.log("user not found");
  else
    console.log(`Name: ${user.name} - Email: ${user.email} - Age: ${user.age}`);
};
//edit user
const editUser = (id, newData) => {
  const allUsers = dealWithJson.readData(dataFile);
  const userIndex = allUsers.findIndex((user) => user.id == id);
  for (const key in newData) {
    // console.log(`${key}: ${newData[key]}`);
    allUsers[userIndex][key] = newData[key];
  }
  // console.log("the user is changed");
  // console.log(user);
  dealWithJson.writeData(dataFile, allUsers);
};

//delete user
const deleteUser = (id) => {
  const allData = dealWithJson.readData(dataFile);
  const user = allData.find((u) => u.id == id);
  if (!user) console.log("user not found");
  else {
    console.log(chalk.green("User Deleted"));
    const users = allData.filter((u) => u.id != id);
    dealWithJson.writeData(dataFile, users);
  }
};
module.exports = { addUser, readAll, singleUser, editUser, deleteUser };
