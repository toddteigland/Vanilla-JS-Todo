document.querySelector("form").addEventListener("submit", handleSubmitForm);
document
  .querySelector("ul")
  .addEventListener("click", handleEditDeleteOrCheckCLick);
document.getElementById("clearAll").addEventListener("click", handleClearAll);

function handleSubmitForm(e) {
  e.preventDefault();
  let input = document.querySelector("input");
  if (input.value != "") addTodo(input.value);
  input.value = "";
}
function handleEditDeleteOrCheckCLick(e) {
  if (e.target.name == "checkButton") {
    checkTodo(e);
  }
  if (e.target.name == "deleteButton") {
    deleteTodo(e);
  }
  if (e.target.name == "editButton") {
    editTodo(e);
  }
}

function addTodo(todo) {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");

  li.innerHTML = `
  <span class="todo-item">${todo}</span>
    <button name="editButton"><i class="fas fa-edit"></i></button>
    <button name="checkButton"><i class="fas fa-check-square"></i></button>
    <button name="deleteButton"><i class="fas fa-trash"></i></button>
  `;
  li.classList.add("todo-list-item");
  ul.appendChild(li);
}

function checkTodo(e) {
  let item = e.target.parentNode;
  if (item.style.textDecoration === "line-through")
    item.style.textDecoration = "none";
  else item.style.textDecoration = "line-through";
}

function deleteTodo(e) {
  let item = e.target.parentNode;
  item.addEventListener("transitionend", function () {
    item.remove();
  });
  item.classList.add("todo-list-item-fall");
}

function editTodo(e) {
  let item = e.target.parentNode;
  item.contentEditable = "true";
}

function handleClearAll(e) {
  document.querySelector("ul").innerHTML = "";
}
