import Project from "./project.js";
import Task from "./task.js";


const storageManager = (function() {

    const projectKeyPrefix = "p";
    const delimiter = "-";

    
    let getProjectKey = function(projectId) {
        return projectKeyPrefix + delimiter + String(projectId);
    };


    let saveProject = function(project) {
        const JSONData = JSON.stringify(project);
        const key = getProjectKey(project.id);

        localStorage.setItem(key, JSONData);
    };

    let reviveTaskObject = function(taskData) {
        const task = new Task(
            taskData.title, 
            taskData.description, 
            0, 0, 0, 
            taskData.priority, 
            taskData.completed, 
            taskData.id
        );
        task.dueDate = new Date(taskData.dueDate);
        return task;
    };

    let populateTaskList = function(taskList) {
        const newTaskList = [];

        for (let taskData of taskList) {
            const task = reviveTaskObject(taskData);
            newTaskList.push(task);
        }

        return newTaskList;
    };

    let reviveProjectObject = function(key) {
        const JSONData = localStorage.getItem(key);
        const projectData = JSON.parse(JSONData);

        const project = new Project(projectData.title, projectData.id);
        project.taskList = populateTaskList(projectData.taskList);
        return project;
    };

    let getProjects = function() {
        const projectList = [];

        for (let i = 0; i < localStorage.length; i += 1) {
            const key = localStorage.key(i);
            const project = reviveProjectObject(key);
            projectList.push(project);
        }

        return projectList;
    };

    let cleanStorage = function() {
        localStorage.clear();
    };

    let saveProjects = function(projectList) {
        cleanStorage();
        
        for (let project of projectList) {
            saveProject(project);
        }
    }

    return {
        "saveProjects": saveProjects,
        "getProjects": getProjects,
    };
})();


export default storageManager;