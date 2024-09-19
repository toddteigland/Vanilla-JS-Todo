document.querySelector("form").addEventListener("submit", handleSubmitForm);
document
  .querySelector("ul")
  .addEventListener("click", handleEditDeleteOrCheckCLick);
document.getElementById("clearAll").addEventListener("click", handleClearAll);
document.addEventListener("DOMContentLoaded", loadTodos);

function handleSubmitForm(e) {
  e.preventDefault();
  let input = document.querySelector("input");
  if (input.value != "") {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let todo = {
      task: input.value,
      createdAt: new Date(),
      completed: false,
    };
    todos.unshift(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    addTodo(todo);
    input.value = "";
    location.reload();
  }
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
  <span class="todo-item">${todo.task}</span>
  <span class="todo-date">${new Date(todo.createdAt).toLocaleString()}</span>
    <button name="editButton"><i class="fas fa-edit"></i></button>
    <button name="checkButton"><i class="fas fa-check-square"></i></button>
    <button name="deleteButton" onclick><i class="fas fa-trash"></i></button>
  `;
  // POSSIBLY NOT NEEDED, COMPLETED ISN'T A FACTOR UNTIL AFTER ITS ADDED //
  if (todo.completed) {
    li.querySelector(".todo-item").classList.add("crossedOut");
  }
  li.classList.add("todo-list-item");
  ul.appendChild(li);
}

function checkTodo(e) {
  let item = e.target.closest("li").querySelector(".todo-item");
  let todoText = item.textContent;
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todo = todos.find((todo) => todo.task === todoText);
  if (todo) {
    todo.completed = !todo.completed;
    if (todo.completed) {
      item.classList.add("crossedOut");
      console.log("todo completed", localStorage.todos);
    } else {
      item.classList.remove("crossedOut");
      console.log("todo incomplete", localStorage.todos);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    location.reload();
  }
}

function deleteTodo(e) {
  let item = e.target.closest("li");
  let todoText = item.querySelector(".todo-item").textContent;
  item.remove();

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((todo) => todo.task !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
  showDeleteAlert();
}

function editTodo(e) {
  let item = e.target.closest("li").querySelector(".todo-item");
  item.contentEditable = "true";
}

function handleClearAll(e) {
  document.querySelector("ul").innerHTML = "";
  localStorage.clear();
}

function loadTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    todo.createdAt = new Date(todo.createdAt);
  });
  todos.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  todos.sort((a, b) => a.completed - b.completed);
  document.querySelector("ul").innerhtml = "";
  todos.forEach((todo) => addTodo(todo));
}
console.log("Local Storage: ", localStorage.todos);

function showDeleteAlert() {
  document.getElementById("alertDiv").classList.add("show");
  setTimeout(() => {
    document.getElementById("alertDiv").classList.remove("show");
  }, 2500);
}
