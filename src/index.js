import "./styles.css";
import storageManager from "./localStorage.js";
import todo from "./todoList.js";
import createDOMManager from "./DOMManager.js";


const app = (function() {
    const storage = storageManager;
    const todoList = todo;
    const DOMManager = createDOMManager();

    DOMManager.DOMLoadedEvent(loadedEvent);
    DOMManager.taskClickEvent(toggleTaskDone, taskDetailsEvent);
    DOMManager.popupClickEventListeners(removeTaskEvent);
    DOMManager.popupSubmitEventListener(editTaskEvent, newTaskEvent);
    DOMManager.projectClickEvent(getProject);
    DOMManager.projectPopupClickEventListeners(deleteProjectEvent);
    DOMManager.projectPopupSubmitEventListener(editProjectEvent, addProjectEvent);
    DOMManager.projectSelectionClickEvent(getProject);
    DOMManager.unloadedEvent(DOMUnloadedEvent);


    function loadedEvent() {
        loadData();
        const project = todoList.getProject(todoList.getDefaultProjectId());
        DOMManager.displayProject(project);

        const projectList = todoList.getProjectList();
        DOMManager.displayProjectList(projectList, todoList.getDefaultProjectId());
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

    function editTaskEvent(projectId, taskId, taskInfo) {
        const project = todoList.getProject(projectId);
        const task = project.editTask(taskId, taskInfo);
        return task;
    };

    function newTaskEvent(projectId, taskInfo) {
        const project = todoList.getProject(projectId);
        const task = project.addTask(
            taskInfo["title"], 
            taskInfo["description"], 
            1970, 0, 1, 
            taskInfo["priority"]
        );
        const date = new Date(taskInfo["date"]);
        task.setDate(date);

        const newPercent = project.getCompletionPercentage();
        
        return [task, newPercent];
    };

    function getProject(projectId) {
        const project = todoList.getProject(projectId);
        return project;
    };

    function editProjectEvent(projectId, newProjectTitle) {
        const project = todoList.getProject(projectId);
        if (project.id === todoList.getDefaultProjectId()) {
            return null;
        }
        project.title = newProjectTitle;
        return project;
    };

    function addProjectEvent(newProjectTitle) {
        const project = todoList.addProject(newProjectTitle);
        return project;
    };

    function deleteProjectEvent(projectId) {
        const removedProject = todoList.removeProject(projectId);
        if (removedProject === null) {
            return null;
        }

        const defaultProject = todoList.getProject(todoList.getDefaultProjectId());
        return defaultProject;
    };

    function DOMUnloadedEvent() {
        storageManager.saveProjects(todoList.getProjectList());
    };

})();
