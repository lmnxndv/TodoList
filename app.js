const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#ul-todo");
const allRemove = document.querySelector("#allRemove");

window.addEventListener("load", () => {
  const todos = getTodosFromLocalStorage();
  displayTodos(todos);
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let todoText = input.value;
  if (todoText === "") {
    alert("Please enter a valid task name.");
  }
  const newLi = document.createElement("li");
  newLi.innerHTML = `${todoText}`;
  todoList.appendChild(newLi);
  input.value = "";

  const removeBtn = document.createElement("i");
  removeBtn.classList = "fa-regular fa-circle-xmark";
  newLi.appendChild(removeBtn);

  removeBtn.addEventListener("click", () => {
    newLi.remove();
    removeTodoFromLocalStorage(todoText);
  });

  saveTodoToLocal(todoText);
});

allRemove.addEventListener("click", () => {
  todoList.innerHTML = "";
  clearLocalStorage();
});

function displayTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = todo;
    todoList.appendChild(newLi);
    input.value = "";

    const removeBtn = document.createElement("i");
    removeBtn.classList = "fa-regular fa-circle-xmark";
    newLi.appendChild(removeBtn);

    removeBtn.addEventListener("click", () => {
      newLi.remove();
      removeTodoFromLocalStorage(todoText);
    });
  });
}

function saveTodoToLocal(todoText) {
  let todos = [];
  const existingTodos = localStorage.getItem("todos");
  if (existingTodos) {
    todos = JSON.parse(existingTodos);
  }
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearLocalStorage() {
  localStorage.removeItem("todos");
}

function getTodosFromLocalStorage() {
  const existingTodos = localStorage.getItem("todos");
  if (existingTodos) {
    return JSON.parse(existingTodos);
  }
  return [];
}

function removeTodoFromLocalStorage(todoText) {
  const todos = getTodosFromLocalStorage();
  let updatedTodo = todos.filter((todo) => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodo));
}
