let todo = JSON.parse(localStorage.getItem("todo")) || []; // Retrieve tasks from localStorage

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo)); // Save tasks to localStorage
}

function renderTodos() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = ""; // Clear the list before rendering

  todo.forEach((item, index) => {
    const todoList = document.createElement("div");
    todoList.classList.add("todoList");

    const task = document.createElement("li");
    task.classList.add("task");
    task.textContent = item.text;
    task.style.textDecoration = item.completed ? "line-through" : "none";

    const complete = document.createElement("li");
    complete.classList.add("complete");
    complete.textContent = item.completed ? '❌' : '✔';

    complete.addEventListener("click", function () {
      item.completed = !item.completed; // Toggle completion status
      saveToLocalStorage();
      renderTodos();
    });

    const removeLi = document.createElement("li");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", function () {
      todo.splice(index, 1); // Remove task from the array
      saveToLocalStorage();
      renderTodos();
    });

    removeLi.appendChild(removeBtn);

    todoList.append(complete);
    todoList.append(task);
    todoList.append(removeLi);

    ul.appendChild(todoList);
  });
}

function addTodo() {
  const addInput = document.getElementById("addInput");
  let taskText = addInput.value;

  if (taskText === '') {
    alert('Please add your task!');
    return;
  }

  todo.push({ text: taskText, completed: false }); // Add new task to the array
  saveToLocalStorage();
  renderTodos();

  addInput.value = '';
}

// Render tasks on page load
document.addEventListener("DOMContentLoaded", renderTodos);