

function createDOMManager() {
    const projectCard = document.querySelector(".project-card");
    const projectInfoDiv = document.querySelector(".project-info");
    const projectTitleSpan = document.querySelector(".project-title");
    const projectPercentSpan = document.querySelector(".project-percentage");
    const projectTasksDiv = document.querySelector(".project-tasks");

    const taskCardClass = "task-card";
    const taskTitleClass = "task-title";
    const taskDateClass = "task-duedate";
    const btnDoneClass = "done";
    const btnNotDoneClass = "not-done";


    let clearProjectCard = function() {
        projectTitleSpan.textContent = "";
        projectPercentSpan.textContent = "";
        projectTasksDiv.innerHTML = "";
    };

    let createPara = function(text, className=null) {
        const para = document.createElement("p");
        para.textContent = text;
        if (className !== null) {
            para.classList.add(className);
        }
        return para;
    };

    let createTaskDoneBtn = function(completed) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Done:";
        if (completed) {
            btn.classList.add(btnDoneClass);
        } else {
            btn.classList.add(btnNotDoneClass);
        }

        return btn;
    };

    let addPriorityClass = function(div, priorityNum) {
        let className = null;
        if (priorityNum === 1) {
            className = "low-priority";
        } else if (priorityNum === 2) {
            className = "med-priority";
        } else if (priorityNum === 3) {
            className = "high-priority";
        }

        if (className !== null) {
            div.classList.add(className);
        }
    };

    let populateInfoSection = function(project) {
        projectTitleSpan.textContent = project.title;
        projectPercentSpan.textContent = project.getCompletionPercentage();
    };

    let createTaskCard = function(task) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add(taskCardClass);
        addPriorityClass(taskDiv, task.priority);
        taskDiv.dataset.taskid = task.id;

        const taskTitlePara = createPara(task.title, taskTitleClass);
        taskDiv.appendChild(taskTitlePara);
        const taskDatePara = createPara(task.getDueDate(), taskDateClass);
        taskDiv.appendChild(taskDatePara);

        const taskDoneBtn = createTaskDoneBtn(task.completed);
        taskDiv.appendChild(taskDoneBtn);

        return taskDiv;
    };

    let populateTaskSection = function(tasks) {
        for (let task of tasks) {
            const taskCard = createTaskCard(task);
            projectTasksDiv.appendChild(taskCard);
        }
    };

    let displayProject = function(project) {
        clearProjectCard();
        projectCard.dataset.id = project.id;
        populateInfoSection(project);
        populateTaskSection(project.taskList);
    };

    let DOMLoadedEvent = function(callback) {
        document.addEventListener("DOMContentLoaded", function() {
            callback();
        });
    };

    let unloadedEvent = function(callback) {
        document.addEventListener("onbeforeunload", function() {
            callback();
        }); 
    };

    let taskClickEvent = function(editCallback, doneBtnCallback) {
        projectTasksDiv.addEventListener("click", function(event) {
            if (event.target.matches(".task-card") || event.target.matches("p")) {
                console.log("edit")
            } else if (event.target.matches("button")) {
                console.log("done")
            }
        });
    }

    return {
        "displayProject": displayProject,
        "DOMLoadedEvent": DOMLoadedEvent,
        "unloadedEvent": unloadedEvent,
        "taskClickEvent": taskClickEvent,
    };
};


export default createDOMManager;