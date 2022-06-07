let form = document.getElementById("form");
let keysHead = ["name", "age", "mobile"];
let tableBody = document.getElementById("tableBody");
//create read from storage
const readDataFromStorage = (key) => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(key)) || [];
    if (!Array.isArray(data)) throw new Error("is not a array");
  } catch {
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
//show all tasks
const showAll = (allData) => {
  tableBody.textContent = "";
  if (allData.length == 0) {
    const row = createElement(tableBody, "tr", null, "alert alert-danger");
    const col = createElement(row, "td", "No Data Yet", "alert alert-danger");
    col.setAttribute("colspan", "3");
  }
  allData.forEach((ele, i) => {
    const row = createElement(tableBody, "tr", null, null);
    createElement(row, "td", ele.id, null);
    createElement(row, "td", ele.name, null);
    createElement(row, "td", ele.age, null);
    createElement(row, "td", ele.status, null);
    // createElement(row, "td", ele.contentText, null);
    let col = createElement(row, "td", null, "text-center");
    let submitBtn = createElement(
      col,
      "button",
      "Show",
      "btn btn-primary mx-3"
    );
    let editBtn = createElement(col, "button", "Edit", "btn btn-warning mx-3");
    editBtn.addEventListener("click", (e) => {
      if (ele.status) {
        if (confirm("Are You Sure To Change Status")) {
          if (ele.status == "active") ele.status = "inactive";
          else ele.status = "active";
          writeDataToStorage("tasks", allData);
          showAll(allData);
        }
      }
    });
    let deleteBtn = createElement(
      col,
      "button",
      "Delete",
      "btn btn-danger mx-3"
    );
    deleteBtn.addEventListener("click", (e) => {
      allData.splice(i, 1);
      writeDataToStorage("tasks", allData);
      showAll(allData);
    });
  });
};
//add new task
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = { status: "active", id: Date.now() };
    keysHead.forEach((ele) => (user[ele] = form.elements[ele].value));
    const allTasks = readDataFromStorage("tasks");
    allTasks.push(user);
    writeDataToStorage("tasks", allTasks);
    form.reset();
    window.location.href = "index.html";
  });
}
if (tableBody) {
  const allData = readDataFromStorage("tasks");
  showAll(allData);
}
