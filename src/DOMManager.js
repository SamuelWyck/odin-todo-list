

function createDOMManager() {
    const projectCard = document.querySelector(".project-card");
    const projectInfoDiv = document.querySelector(".project-info");
    const projectTitleSpan = document.querySelector(".project-title");
    const projectPercentSpan = document.querySelector(".project-percentage");
    const projectTasksDiv = document.querySelector(".project-tasks");

    const projectListDiv = document.querySelector(".project-list");
    const addProjectBtn = document.querySelector(".add-project-btn");

    const projectPopup = document.querySelector(".project-popup");
    const projectNameInput = document.querySelector("input[name='project-name']");
    const projectHiddenInput = document.querySelector("input[name='project-id']");
    const projectPopupBtnsDiv = document.querySelector(".project-btns-div");
    const projectDelBtn = document.querySelector(".del-project-btn");

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
    };

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
    };

    let populateTaskForm = function(task) {
        hiddenInput.value = task.id;
        titleInput.value = task.title;
        dateInput.valueAsDate = task.dueDate;
        prioritySelect.value = task.priority;
        descriptionTextArea.value = task.description;
    };

    let clearTaskForm = function() {
        hiddenInput.value = -1;
        titleInput.value = "";
        dateInput.value = "";
        prioritySelect.value = "0";
        descriptionTextArea.value = "";
    };

    let showDeleteBtn = function(show=false) {
        if (show) {
            deleteBtn.classList.remove("hidden");
            popupDelSaveBtnDiv.classList.remove("one-btn");
            popupDelSaveBtnDiv.classList.add("two-btn");
        } else {
            deleteBtn.classList.add("hidden");
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

    let clearProjectForm = function() {
        projectHiddenInput.value = -1;
        projectNameInput.value = "";
    };

    let showProjectDeleteBtn = function(show=false) {
        if (show) {
            projectDelBtn.classList.remove("hidden");
            projectPopupBtnsDiv.classList.remove("two-btn");
            projectPopupBtnsDiv.classList.add("one-btn");
        } else {
            projectDelBtn.classList.add("hidden");
            projectPopupBtnsDiv.classList.add("one-btn");
            projectPopupBtnsDiv.classList.remove("two-btn");
        }
    };

    let populateProjectForm = function(project) {
        projectHiddenInput.value = project.id;
        projectNameInput.value = project.title;
    };

    let hideProjectFormPopup = function() {
        projectPopup.classList.add("hidden");
        popupShowing = false;
    };

    let showProjectFormPopup = function(getProjectCallback, edit=false) {
        if (edit) {
            const projectId = getCurrentProjectId();
            const project = getProjectCallback(projectId);
            populateProjectForm(project);
            showProjectDeleteBtn(true);
        } else {
            clearProjectForm();
            showProjectDeleteBtn(false);
        }
        projectPopup.classList.remove("hidden");
        popupShowing = true;
    };

    let hideTaskFormPopup = function() {
        popup.classList.add("hidden");
        popupShowing = false;
    };

    let deleteTask = function(deleteTaskCallback) {
        const projectId = getCurrentProjectId();
        const taskId = hiddenInput.value;
        const newProjectPercent = deleteTaskCallback(projectId, taskId);
        removeTaskFromDisplay(taskId);
        updateProjectPercentage(newProjectPercent);
    };

    let parseFormData = function(formData) {
        const taskInfo = {};
        taskInfo["title"] = formData.get("title");
        taskInfo["priority"] = Number(formData.get("priority"));
        taskInfo["description"] = formData.get("description");
        taskInfo["date"] = formData.get("date");
        return taskInfo;
    };

    let handleTaskEdit = function(formData, editTaskCallback) {
        const taskInfo = parseFormData(formData);
        const taskId = formData.get("id");
        const projectId = getCurrentProjectId();
        const editedTask = editTaskCallback(projectId, taskId, taskInfo);
        updateTask(editedTask);
    };

    let getFormData = function(form) {
        const formData = new FormData(form);
        const newTask = formData.get("id") === "-1";
        return [formData, newTask];
    };

    let handleNewTask = function(formData, newTaskCallback) {
        const taskInfo = parseFormData(formData);
        const projectId = getCurrentProjectId();
        const [task, newPercent] = newTaskCallback(projectId, taskInfo);

        const taskCard = createTaskCard(task);
        projectTasksDiv.appendChild(taskCard);
        updateProjectPercentage(newPercent);
    };

    let handleTaskFormSubmit = function(form, editTaskCallback, newTaskCallback) {
        const [formData, newTask] = getFormData(form);
        
        if (newTask) {
            handleNewTask(formData, newTaskCallback);
        } else {
            handleTaskEdit(formData, editTaskCallback);
        }
    };

    let createProjectSelection = function(project, defaultProjectId) {
        const para = createPara(project.title);
        para.dataset.projectid = project.id;
        if (project.id === defaultProjectId) {
            para.classList.add("project-selected");
        }
        projectListDiv.appendChild(para);
    };

    let displayProjectList = function(projectList, defaultProjectId) {
        for (let project of projectList) {
            createProjectSelection(project, defaultProjectId);
        }
    };

    let updateProjectTitle = function(project) {
        projectTitleSpan.textContent = project.title;

        for (let projectSelect of projectListDiv.children) {
            if (Number(projectSelect.dataset.projectid) === project.id) {
                projectSelect.textContent = project.title;
                break;
            }
        }
    };

    let handleProjectFormSubmit = function(form, editProjectCallback, addProjectCallback) {
        const formData = new FormData(form);
        const projectEdit = formData.get("project-id") !== "-1";
        const newProjectTitle = formData.get("project-name");

        if (projectEdit) {
            const projectId = getCurrentProjectId();
            const project = editProjectCallback(projectId, newProjectTitle);
            if (project !== null) {
                updateProjectTitle(project);
            }
        } else {

        }
    };

    let taskClickEvent = function(doneBtnCallback, getTaskCallback) {
        projectTasksDiv.addEventListener("click", function(event) {
            if (event.target.matches("button") && !popupShowing) {
                const projectId = getCurrentProjectId();
                doneBtnCallback(event, projectId);
            } else if (event.target.matches(".task-card") || event.target.matches("p")) {
                if (!popupShowing) {
                    showTaskFormPopup(event, getTaskCallback, true);
                }
            }
        });
    };

    let popupClickEventListeners = function(deleteTaskCallback) {
        popup.addEventListener("click", function(event) {
            if (event.target.matches(".exit-btn")) {
                hideTaskFormPopup();
            } else if (event.target.matches(".del-btn")) {
                deleteTask(deleteTaskCallback);
                hideTaskFormPopup();
            }
        }) 
    };

    let popupSubmitEventListener = function(editTaskCallback, newTaskCallback) {
        popup.addEventListener("submit", function(event) {
            event.preventDefault();
            handleTaskFormSubmit(event.target, editTaskCallback, newTaskCallback);
            hideTaskFormPopup();
        });
    };

    projectCard.addEventListener("click", function(event) {
        if (event.target.matches(".add-task-btn")) {
            if (!popupShowing) {
                showTaskFormPopup(null, null, false);
            }
        }
    });

    addProjectBtn.addEventListener("click", function() {
        if (!popupShowing) {
            showProjectFormPopup(null, false);
        }
    });

    let projectClickEvent = function(getProjectCallback) {
        projectInfoDiv.addEventListener("click", function() {
            if (!popupShowing) {
                showProjectFormPopup(getProjectCallback, true);
            }
        });
    };

    let projectPopupClickEventListeners = function(deleteProjectCallback) {
        projectPopup.addEventListener("click", function(event) {
            if (event.target.matches(".project-popup-exit")) {
                hideProjectFormPopup();
            } else if (event.target.matches(".del-project-btn")) {

            }
        });
    };

    let projectPopupSubmitEventListener = function(editProjectCallback, addProjectCallback) {
        projectPopup.addEventListener("submit", function(event) {
            event.preventDefault();
            handleProjectFormSubmit(event.target, editProjectCallback, addProjectCallback);
            hideProjectFormPopup();
        });
    };


    return {
        "displayProject": displayProject,
        "displayProjectList": displayProjectList,
        "DOMLoadedEvent": DOMLoadedEvent,
        "unloadedEvent": unloadedEvent,
        "updateTask": updateTask,
        "updateProjectPercentage": updateProjectPercentage,
        "taskClickEvent": taskClickEvent,
        "popupClickEventListeners": popupClickEventListeners,
        "popupSubmitEventListener": popupSubmitEventListener,
        "projectClickEvent": projectClickEvent,
        "projectPopupClickEventListeners": projectPopupClickEventListeners,
        "projectPopupSubmitEventListener": projectPopupSubmitEventListener,
    };
};


export default createDOMManager;