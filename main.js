document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            // Add event listener to mark task as completed
            li.addEventListener("click", function () {
                task.completed = !task.completed;
                updateLocalStorage();
                renderTasks();
            });
            // Add a delete button for each task
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function (e) {
                e.stopPropagation(); // Prevent task from being marked as completed when clicking delete
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });
            li.appendChild(deleteButton);
            if (task.completed) {
                li.classList.add("completed");
            }
            taskList.appendChild(li);
        });
    }

    renderTasks();

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            updateLocalStorage();
            renderTasks();
            taskInput.value = "";
        }
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listener for add task button
    addTaskBtn.addEventListener("click", addTask);

    // Add task on pressing Enter key
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});
