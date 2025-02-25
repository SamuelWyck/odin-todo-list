

function createDOMManager() {
    const projectCard = document.querySelector(".project-card");
    const projectInfoDiv = document.querySelector(".project-info");
    const projectTitleSpan = document.querySelector(".project-title");
    const projectPercentSpan = document.querySelector(".project-percentage");
    const projectTasksDiv = document.querySelector(".project-tasks");

    const popup = document.querySelector(".popup");
    const hiddenInput = document.querySelector("input[name='id']");
    const titleInput = document.querySelector("#title");
    const dateInput = document.querySelector("#date");
    const prioritySelect = document.querySelector("#priority");
    const descriptionTextArea = document.querySelector("#description");
    const deleteBtn = document.querySelector(".del-btn");
    const popupDelSaveBtnDiv = document.querySelector(".del-save-btn-div");

    const taskCardClass = "task-card";
    const taskTitleClass = "task-title";
    const taskDateClass = "task-duedate";
    const btnDoneClass = "done";
    const btnNotDoneClass = "not-done";
    const taskCompletedClass = "completed";

    let popupShowing = false;


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
        if (task.completed) {
            taskDiv.classList.add(taskCompletedClass);
        }
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

    let getCurrentProjectId = function() {
        return projectCard.dataset.id;
    }

    let getTaskDiv = function(id) {
        for (let div of projectTasksDiv.children) {
            if (div.dataset.taskid === id) {
                return div;
            }
        }
    };

    let updateTaskDivPriority = function(taskDiv, priority) {
        taskDiv.classList.remove("low-priority");
        taskDiv.classList.remove("med-priority");
        taskDiv.classList.remove("high-priority");
        addPriorityClass(taskDiv, priority);
    };

    let updateTaskDivCompleted = function(div, completed) {
        if (completed) {
            div.classList.add(taskCompletedClass);
        } else {
            div.classList.remove(taskCompletedClass);
        }
    };

    let updateTask = function(task) {
        let taskDiv = getTaskDiv(String(task.id));
        updateTaskDivPriority(taskDiv, task.priority);
        updateTaskDivCompleted(taskDiv, task.completed);
        
        for (let child of taskDiv.children) {
            if (child.classList.contains("task-title")) {
                child.textContent = task.title;
            } else if (child.classList.contains("task-duedate")) {
                child.textContent = task.getDueDate();
            } else if (child.matches("button")) {
                if (task.completed) {
                    child.classList.add("done");
                } else {
                    child.classList.remove("done");
                }
            }
        }
    };

    let updateProjectPercentage = function(percentage) {
        projectPercentSpan.textContent = percentage;
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

    let removeTaskFromDisplay = function(id) {
        for (let task of projectTasksDiv.children) {
            if (task.dataset.taskid === id) {
                task.remove();
                break;
            }
        }
    }

    let populateTaskForm = function(task) {
        hiddenInput.value = task.id;
        titleInput.value = task.title;
        dateInput.valueAsDate = task.dueDate;
        prioritySelect.value = task.priority;
        descriptionTextArea.value = task.description;
    };

    let clearTaskForm = function() {
        hiddenInput.value = 0;
        titleInput.value = "";
        dateInput.valueAsDate = "";
        prioritySelect.value = "";
        descriptionTextArea.value = "";
    };

    let showDeleteBtn = function(show=false) {
        if (show) {
            deleteBtn.classList.remove("hidden");
            popupDelSaveBtnDiv.classList.remove("one-btn");
            popupDelSaveBtnDiv.classList.add("two-btn");
        } else {
            deleteBtn.add("hidden");
            popupDelSaveBtnDiv.classList.add("one-btn");
            popupDelSaveBtnDiv.classList.remove("two-btn");
        }
    };

    let showTaskFormPopup = function(event, getTaskCallback, edit=false) {
        if (edit) {
            const projectId = getCurrentProjectId();
            const task = getTaskCallback(event, projectId);
            populateTaskForm(task);
            showDeleteBtn(true);
        } else {
            clearTaskForm();
            showDeleteBtn(false);
        }
        popup.classList.remove("hidden");
        popupShowing = true;
    };

    // let createPopupListeners = function(popup, deleteTaskCallback, addTaskCallback) {
    //     popup.addEventListener("click", function(event) {
    //         if (event.target.matches(".exit-btn")) {
    //             popup.remove();
    //             popupShowing = false;
    //         } else if (event.target.matches(".del-btn")) {
    //             const taskId = popup.children[1].children[0].value;
    //             const projectId = getCurrentProjectId();
    //             const newPercentage = deleteTaskCallback(projectId, taskId);
    //             removeTaskFromDisplay(taskId);
    //             console.log(newPercentage)
    //             updateProjectPercentage(newPercentage);
    //             popup.remove();
    //             popupShowing = false;
    //         }
    //     });
    // }

    // let taskEdit = function(event, getTaskCallback, deleteTaskCallback, addTaskCallback) {
    //     popupShowing = true;
    //     const projectId = getCurrentProjectId();
    //     const task = getTaskCallback(event, projectId);
    //     const popup = formFactory.createTaskFormPopup(true, task);
    //     createPopupListeners(popup, deleteTaskCallback, addTaskCallback);
    // };

    let taskDoneBtnClickEvent = function(doneBtnCallback) {
        projectTasksDiv.addEventListener("click", function(event) {
            if (event.target.matches("button") && !popupShowing) {
                const projectId = getCurrentProjectId();
                doneBtnCallback(event, projectId);
            }
        });
    }

    let taskCardClickEvent = function(getTaskCallback) {
        projectTasksDiv.addEventListener("click", function(event) {
            if (event.target.matches(".task-card") || event.target.matches("p")) {
                if (!popupShowing) {
                    showTaskFormPopup(event, getTaskCallback, true);
                }
            }
        });
    };


    return {
        "displayProject": displayProject,
        "DOMLoadedEvent": DOMLoadedEvent,
        "unloadedEvent": unloadedEvent,
        "taskDoneBtnClickEvent": taskDoneBtnClickEvent,
        "updateTask": updateTask,
        "updateProjectPercentage": updateProjectPercentage,
        "taskCardClickEvent": taskCardClickEvent,
    };
};


export default createDOMManager;