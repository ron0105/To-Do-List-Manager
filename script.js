const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterAll = document.getElementById("filter-all");
const filterCompleted = document.getElementById("filter-completed");
const filterPending = document.getElementById("filter-pending");
const searchBar = document.getElementById("search-bar");

let tasks = []; // Array to store all tasks
let filteredTasks = []; // Array to store filtered tasks

// Load tasks on page load
document.addEventListener("DOMContentLoaded", () => {
  tasks = [];
  filteredTasks = tasks;
  renderTasks(filteredTasks);
});

// Add a new task
addTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const description = taskDesc.value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  filteredTasks = tasks;
  renderTasks(filteredTasks);

  // Clear input fields
  taskTitle.value = "";
  taskDesc.value = "";
});

// Render tasks in the DOM
function renderTasks(tasks) {
  taskList.innerHTML = ""; // Clear existing tasks
  tasks.forEach(task => addTaskToDOM(task));
}

// Add a task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.classList.add("task-item");
  li.classList.toggle("completed", task.completed);
  li.innerHTML = `
    <div>
      <strong>${task.title}</strong>
      <p>${task.description || ""}</p>
    </div>
    <div class="task-buttons">
      <button onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    </div>
  `;
  taskList.appendChild(li);
}

// Toggle task completion
function toggleComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.completed = !task.completed;

  const taskElement = document.querySelector(`[data-id='${taskId}']`);
  taskElement.classList.toggle("completed");

  renderTasks(filteredTasks);
}

// Delete a task with animation
function deleteTask(taskId) {
  const taskElement = document.querySelector(`[data-id='${taskId}']`);
  taskElement.style.animation = "slideOut 0.5s ease forwards";
  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== taskId);
    filteredTasks = tasks;
    renderTasks(filteredTasks);
  }, 500); // Wait for animation to complete
}

// Filter tasks
filterAll.addEventListener("click", () => {
  activateFilter(filterAll);
  filteredTasks = tasks;
  renderTasks(filteredTasks);
});

filterCompleted.addEventListener("click", () => {
  activateFilter(filterCompleted);
  filteredTasks = tasks.filter(task => task.completed);
  renderTasks(filteredTasks);
});

filterPending.addEventListener("click", () => {
  activateFilter(filterPending);
  filteredTasks = tasks.filter(task => !task.completed);
  renderTasks(filteredTasks);
});

// Highlight the active filter
function activateFilter(filterBtn) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  filterBtn.classList.add("active");
}

// Search tasks
searchBar.addEventListener("input", () => {
  const searchText = searchBar.value.toLowerCase();
  filteredTasks = tasks.filter(
    task => task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText)
  );
  renderTasks(filteredTasks);
});
