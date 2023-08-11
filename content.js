let tasks = [];
let input_box = document.getElementById("input-box");
let add_button = document.getElementById("add-button");
let refresh_button = document.getElementById("refresh-button");
let taskList = document.getElementById("task-list");


chrome.storage.sync.get("tasks", (data) => {
    if (data.tasks) {
        tasks = data.tasks;
        updateTaskList();
    }
});

add_button.addEventListener("click", () => {
    if (input_box.value === "") {
        alert("You must enter something!");
    } else {
        tasks.push(input_box.value);
        input_box.value = "";
        updateTaskList();
        saveTasksToStorage();
    }
});

refresh_button.addEventListener("click", () => {
    tasks = [];
    updateTaskList();
    saveTasksToStorage();
});

function updateTaskList() {
    taskList.innerHTML = tasks.map((task) => `<div class="task">${task}</div>`).join("");
}

function saveTasksToStorage() {
    chrome.storage.sync.set({ tasks: tasks });
}
