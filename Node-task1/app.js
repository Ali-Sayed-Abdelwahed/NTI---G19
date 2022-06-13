const user = require("./contraller/user");
const validator = require("validator");
// user.addUser("hazem", "hazem@gmail.com", 45);
// user.readAll()
// console.log(user.singleUser("7vevchh5JnjnBGzsBCd5PQ4e"));
// user.editUser("fc7df74c-5223-4526-a355-be5fbd427a2b", {name: "ali sayed",email:"alisayedabdelwahed@gmail.com",age:25,});
// user.deleteUser("7d27dbf8-f027-4a66-97d0-eb56fa0b9662")
const yargs = require("yargs");
yargs.command({
  command: "add",
  builder: {
    name: {
      type: String,
      demandOption: true,
    },
    email: {
      type: String,
      demandOption: true,
    },
    age: {
      type: Number,
      demandOption: true,
    },
  },
  handler: function (argv) {
    user.addUser(argv.name, argv.email, argv.age);
  },
});
yargs.command({
  command: "list",
  handler: function (argv) {
    user.readAll(argv);
  },
});
yargs.command({
  command: "single",
  builder: {
    id: {
      type: Number,
      demandOption: true,
    },
  },
  handler: function (argv) {
    user.singleUser(argv.id);
  },
});
yargs.command({
  command: "edit",
  builder: {
    name: {},
    email: {},
    age: {},
    id: {
      type: Number,
      demandOption: true,
      default: 112221,
    },
  },
  handler: function (argv) {
    const newData = {};
    const heads = ["name", "email", "age"];
    heads.forEach((h) => {
      if (argv[h]) newData[h] = argv[h];
    });
    user.editUser(argv.id, newData);
  },
});
yargs.command({
    command: "delete",
    builder: {
      id: {
        type: Number,
        demandOption: true,
      },
    },
    handler: function (argv) {
      user.deleteUser(argv.id);
    },
  });
yargs.argv;
