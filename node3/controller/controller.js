const deal = require("./dealWithJson");
const dataFile = "database/data.json";
class Post {
  static home = (req, res) => {
    const data = deal.readDataFromStorage(dataFile);
    //   res.send(data);
    res.render("home", { pageTitle: "All Posts", data, isEmpty: !data.length });
  };
  static single = (req, res) => {
    const postId = req.params.id;
    const data = deal.readDataFromStorage(dataFile);
    const postData = data.find((p) => p.id == postId);
    res.render("single", { pageTitle: "Show Single Post", postData });
  };

  static add = (req, res) => {
    if (req.query.title && req.query.content && req.query.date) {
      const newPost = { id: Date.now(), ...req.query };
      const data = deal.readDataFromStorage(dataFile);
      data.push(newPost);
      deal.writeDataToStorage(dataFile, data);
      res.redirect("/");
    } else {
      res.render("add", { pageTitle: "Add Post" });
    }
  };
  static addPost = (req, res) => {
    res.render("addPost", { pageTitle: "Add Post" });
  };
  static addPostLogic = (req, res) => {
    if (req.body.title && req.body.content && req.body.date) {
      const newPost = { id: Date.now(), ...req.body };
      const data = deal.readDataFromStorage(dataFile);
      data.push(newPost);
      deal.writeDataToStorage(dataFile, data);
      res.redirect("/");
    } else {
      res.render("addPost", { pageTitle: "Add Post" });
    }
  };
  static delete = (req, res) => {
    const postId = req.params.id;
    const data = deal.readDataFromStorage(dataFile);
    const filtersPosts = data.filter((p) => p.id != postId);
    deal.writeDataToStorage(dataFile, filtersPosts);
    res.redirect("/");
  };
  static edit = (req, res) => {
    const postId = req.params.id;
    const data = deal.readDataFromStorage(dataFile);
    const postData = data.find((post) => {
      return post.id == postId;
    });

    res.render("edit", {
      pageTitle: "Edit Post",
      postData,
    });
  };
  static editPostLogic = (req, res) => {
    const data = deal.readDataFromStorage(dataFile);
    const postId = req.params.id;
    const postIndex = data.findIndex((post) => {
      return post.id == postId;
    });
    data[postIndex] = { id: postId, ...req.body };
    deal.writeDataToStorage(dataFile, data);
    res.redirect("/");
  };
}
module.exports = Post;
