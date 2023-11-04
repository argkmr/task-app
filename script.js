const input = document.getElementById("input");
const description = document.getElementById("textArea");
const addTask = document.getElementById("btn");
const myTasks = document.getElementById("my-tasks");

const allTask = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

const createElement = () => {
    allTask.map((taskObj, idx) => {
        const eachTask = document.createElement("div");
        eachTask.setAttribute("class", "each-task");

        const taskTitle = document.createElement("h3");
        taskTitle.setAttribute("id", "taskTitle");
        taskTitle.innerText = taskObj.title;

        const taskDescription = document.createElement("p");
        taskDescription.setAttribute("id", "taskDescription");
        taskDescription.innerText = taskObj.description;

        const removeBtn = document.createElement("button");
        removeBtn.setAttribute("id", "removeTask");
        removeBtn.innerText = "Done";

        eachTask.append(taskTitle);
        eachTask.append(taskDescription);
        eachTask.append(removeBtn);

        myTasks.append(eachTask);
        input.value = '';
        description.value = '';

        removeBtn.addEventListener("click", () => {
            removePrevRenderedTask();
            allTask.splice(idx, 1);
            localStorage.setItem("tasks", JSON.stringify(allTask));
            createElement();
        })

    });
};

createElement();

const removePrevRenderedTask = () => {
    const prevRenderedTask = document.getElementsByClassName("each-task");

    const prevRenderedTaskArray = Array.from(prevRenderedTask);

    prevRenderedTaskArray.map((taskObj) => {
        taskObj.remove();
    });

    // querySelectorAll version ->
    // const elements = document.querySelectorAll(".each-task");
    // elements.forEach(element => {
    //     element.remove();
    // });
}

addTask.addEventListener("click", () => {
    removePrevRenderedTask();
    allTask.push({
        title: input.value,
        description: description.value,
    })
    createElement();
    localStorage.setItem("tasks", JSON.stringify(allTask));

});