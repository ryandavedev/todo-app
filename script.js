let tasks = [];

const inputNewTask = document.querySelector(".input-new-item");
const addNewTaskButton = document.querySelector("[data-add-button]");
const countOfTask = document.querySelector(".input-number-task");
const userName = document.querySelector(".user-name");

userName.addEventListener("change", e => {
    let nameOfUser = e.target.value;
    localStorage.setItem("name", nameOfUser);
    console.log(nameOfUser);
});

userName.value = localStorage.getItem("name");

const myLocalStorage = JSON.parse(localStorage.getItem("tasks"));

if (myLocalStorage) {
    tasks = myLocalStorage;
    listTask();
}

countOfTask.textContent = `You have ${tasks.length} tasks today`;

function updateCount() {
    countOfTask.textContent = `You have ${tasks.length} tasks today`;
}

addNewTaskButton.addEventListener("click", () => {
    if (!inputNewTask.value) {
        alert("Please input a task");
    } else {
        const todo = {
            task: inputNewTask.value,
            status: "not-done",
        };
        tasks.push(todo);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        inputNewTask.value = "";
        listTask();
        updateCount();
    }
});

function listTask() {
    const listOfTask = document.querySelector(".list-item");
    listOfTask.innerHTML = "";

    if (tasks.length === 0) {
        listOfTask.innerHTML = "";
    }

    tasks.forEach(item => {
        const itemContainer = document.createElement("div");
        const newTask = document.createElement("input");
        const editBtn = document.createElement("div");
        const deleteBtn = document.createElement("div");

        newTask.value = item.task;

        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square edit-btn"></i>`;
        deleteBtn.innerHTML = `<i class="fa-solid fa-circle-xmark delete-btn"></i>`;

        editBtn.classList.add("edit-btn");
        deleteBtn.classList.add("delete-btn");
        itemContainer.classList.add("item-container");
        newTask.classList.add("new-item");
        newTask.setAttribute("readonly", "readonly");

        itemContainer.append(newTask, editBtn, deleteBtn);
        listOfTask.appendChild(itemContainer);

        if (item.status === "done") {
            newTask.classList.add("done");
        } else if (item.status === "not-done") {
            newTask.classList.remove("done");
        }

        newTask.addEventListener("click", () => {
            if (item.status === "done") {
                item.status = "not-done";
                localStorage.setItem("tasks", JSON.stringify(tasks));
                newTask.classList.remove("done");
            } else if (item.status === "not-done") {
                item.status = "done";
                localStorage.setItem("tasks", JSON.stringify(tasks));
                newTask.classList.add("done");
            }
        });

        editBtn.addEventListener("click", e => {
            if (editBtn.className === "edit-btn") {
                editBtn.innerHTML = `<i class="fa-solid fa-check save-btn"></i>`;
                editBtn.classList.remove("edit-btn");
                editBtn.classList.add("save-btn");

                newTask.removeAttribute("readonly");
                newTask.focus();

                newTask.classList.add("focus");
                console.log("edit this");
            } else if (editBtn.className === "save-btn") {
                if (!newTask.value) {
                    tasks = tasks.filter(t => t != item);
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    updateCount();
                    listTask();
                } else {
                    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square edit-btn"></i>`;
                    editBtn.classList.remove("save-btn");
                    editBtn.classList.add("edit-btn");
                    newTask.setAttribute("readonly", "readonly");

                    item.task = newTask.value;
                    newTask.classList.remove("focus");
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                }
            }
        });

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t != item);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateCount();
            listTask();
        });
    });
}
