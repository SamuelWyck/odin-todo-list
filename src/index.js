import "./styles.css";
import storageManager from "./localStorage.js";
import createProject from "./project.js";
import todo from "./todoList.js";
import createDOMManager from "./DOMManager.js";
// import Task from "./task.js";


// const project = createProject("test");

// const task = project.addTask("task", "we we", 2025, 2, 23, 0);

// storageManager.addProject(project)

// console.log(project.taskList)

// const projects = storageManager.getProjects();

// console.log(projects)

// const date = projects[0].taskList[0].dueDate

// console.log(date)

// const newTask = new Task("test1", "we", 0, 0, 0, 0)
// newTask.dueDate = new Date(date)
// console.log(newTask.dueDate)
// console.log(newTask.getDueDate())

// const task = new Task("we", "we we", 2025, 3, 13)
// console.log(task.getDueDate())



// localStorage.clear()


const app = (function() {
    const storage = storageManager;
    const todoList = todo;
    const DOMManager = createDOMManager();

    DOMManager.DOMLoadedEvent(loadedEvent);
    DOMManager.taskDoneBtnClickEvent(toggleTaskDone);
    DOMManager.taskCardClickEvent(taskDetailsEvent);
    DOMManager.popupClickEventListeners(removeTaskEvent);


    function loadedEvent() {
        loadData();
        const project = todoList.getProject(todoList.getDefaultProjectId());
        DOMManager.displayProject(project);
    };
    
    function loadData() {
        const projectList = storage.getProjects();
        if (projectList.length > 0) {
            todoList.setProjectList(projectList);
        }
    };

    function getTaskId(event) {
        if (event.target.matches(".task-card")) {
            return event.target.dataset.taskid;
        }
        return event.target.parentNode.dataset.taskid;
    };

    function toggleTaskDone(event, projectId) {
        const taskId = getTaskId(event);
        const project = todoList.getProject(projectId);
        const task = project.getTask(taskId);
        task.toggleCompleted();
        DOMManager.updateTask(task);

        const newPercentage = project.getCompletionPercentage();
        DOMManager.updateProjectPercentage(newPercentage);
    };

    function taskDetailsEvent(event, projectId) {
        const taskId = getTaskId(event);
        const project = todoList.getProject(projectId);
        const task = project.getTask(taskId);
        return task;
    };

    function removeTaskEvent(projectId, taskId) {
        const project = todoList.getProject(projectId);
        project.removeTask(taskId);
        const newPercentage = project.getCompletionPercentage();
        return newPercentage;
    };

    function addTaskEvent() {
        
    };


})();
