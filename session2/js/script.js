const form = document.getElementById("form");
const uName = document.getElementsByTagName("input")[0];
const uAge = document.getElementsByTagName("input")[1];
const uMobile = document.getElementsByTagName("input")[2];
const keysHead = ["name", "age", "mobile"];
const tableBody = document.getElementById("tableBody");
const userData = document.getElementById("userData");
const editForm = document.getElementById("editForm");
//create read from storage
const readDataFromStorage = (key, dataType = "") => {
  let data;
  let myData = localStorage.getItem(key);
  if (dataType == "string") return myData;
  try {
    data = JSON.parse(myData);
    if (!Array.isArray(data)) throw new Error("not a array");
  } catch (e) {
    data = [];
  }
  return data;
};
//create write to storage
const writeDataToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    localStorage.setItem(key, []);
  }
};
//create My Own Element
const createElement = (parent, element, text, classes) => {
  const myElement = document.createElement(element);
  if (text) myElement.textContent = text;
  if (classes) myElement.classList = classes;
  parent.appendChild(myElement);
  return myElement;
};
//delete user
const deleteUser = (key, allData, i) => {
  allData.splice(i, 1);
  writeDataToStorage(key, allData);
  showAll(allData);
};
//show single
const showSingle = (i) => {
  localStorage.setItem("single", i);
  window.location.href = "single.html";
};
//edit single data
const editUserData = (i) => {
  localStorage.setItem("edit", i);
  window.location.href = "edit.html";
};

if (userData) {
  const index = readDataFromStorage("single", "string");
  const allData = readDataFromStorage("tasks");
  try {
    const user = allData[index];
    const row = createElement(userData, "tr", null, null);
    createElement(row, "td", user.id, null);
    createElement(row, "td", user.name, null);
    createElement(row, "td", user.age, null);
    createElement(row, "td", user.mobile, null);
    createElement(row, "td", user.status, null);
    const col = createElement(row, "td", null, "text-center");
    let editBtn = createElement(col, "button", "Edit", "btn btn-warning mx-3");
    editBtn.addEventListener("click", (e) => {
      if (user.status) {
        if (confirm("Are You Sure To Change The Status ?")) {
          if (user.status == "active") user.status = "inactive";
          else user.status = "active";
          writeDataToStorage("single", allData);
          // showSingle(allData);
        }
      }
    });
  } catch (e) {
    const row = createElement(tableBody, "tr", null, "alert alert-danger");
    const col = createElement(row, "td", "No Data Yet", "alert alert-danger");
    col.setAttribute("colspan", "6");
  }
}
//show all tasks
const showAll = (allData) => {
  tableBody.textContent = "";
  if (allData.length == 0) {
    const row = createElement(tableBody, "tr", null, "alert alert-danger");
    const col = createElement(row, "td", "No Data Yet", "alert alert-danger");
    col.setAttribute("colspan", "6");
  }
  allData.forEach((ele, i) => {
    const row = createElement(tableBody, "tr", null, null);
    createElement(row, "td", ele.id, null);
    createElement(row, "td", ele.name, null);
    createElement(row, "td", ele.age, null);
    createElement(row, "td", ele.mobile, null);
    createElement(row, "td", ele.status, null);
    let col = createElement(row, "td", null, "text-center");
    let showBtn = createElement(col, "button", "Show", "btn btn-primary mx-3");
    showBtn.addEventListener("click", (e) => {
      showSingle(i);
    });
    let editBtn = createElement(col, "button", "Edit", "btn btn-warning mx-3");
    editBtn.addEventListener("click", (e) => {
      // if (ele.status) {
      //   if (confirm("Are You Sure To Change The Status ?")) {
      //     if (ele.status == "active") ele.status = "inactive";
      //     else ele.status = "active";
      //     writeDataToStorage("tasks", allData);
      //     showAll(allData);
      //   }
      // }
      editUserData(i);
    });
    let deleteBtn = createElement(
      col,
      "button",
      "Delete",
      "btn btn-danger mx-3"
    );
    deleteBtn.addEventListener("click", (e) => {
      if (confirm("Are You Sure To Delete This User ?")) {
        deleteUser("tasks", allData, i);
      }
    });
  });
};
//add new task
if (form) {
  form.addEventListener("submit", function (e) {
    if (
      uName.value.length == 0 ||
      uAge.value.length == 0 ||
      uMobile.value.length < 11
    )
      e.preventDefault();
    else {
      e.preventDefault();
      const user = {
        status: "active",
        id: Date.now(),
      };
      keysHead.forEach((ele) => (user[ele] = form.elements[ele].value));
      const allTasks = readDataFromStorage("tasks");
      allTasks.push(user);
      writeDataToStorage("tasks", allTasks);
      form.reset();
      window.location.href = "index.html";
    }
  });
}
if (tableBody) {
  const allData = readDataFromStorage("tasks");
  showAll(allData);
}
if (editForm) {
  const index = readDataFromStorage("edit", "string");
  const allData = readDataFromStorage("tasks");
  const user = allData[index];
  keysHead.forEach((ele) => (editForm.elements[ele].value = user[ele]));
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    keysHead.forEach(
      (ele) => (allData[index][ele] = editForm.elements[ele].value)
    );
    writeDataToStorage("tasks", allData);
    editForm.reset();
    window.location.href = "index.html";
  });
}
