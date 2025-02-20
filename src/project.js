import Task from "./task.js";

function createProject(title) {
    let projectTitle = title;
    let taskList = [];


    let addTask = function(title, description, dueYear, dueMonth, dueDay, priority) {
        const task = new Task(title, description, Number(dueYear), Number(dueMonth), Number(dueDay), priority);
        taskList.push(task);
    };

    let removeTask = function(id) {
        let newTaskList = [];

        for (let task of taskList) {
            if (task.id !== id) {
                newTaskList.push(task);
            }
        }
        taskList = newTaskList;
    };

    let getTask = function(id) {
        for (let task of taskList) {
            if (task.id === id) {
                return task;
            }
        }
        return null;
    };

    let getTaskList = function() {
        return taskList;
    };

    let getCompletionPercentage = function() {
        let totalTasks = taskList.length;
        let completedTasks = 0;

        for (let task of taskList) {
            if (task.completed) {
                completedTasks += 1;
            }
        }

        return Math.round((completedTasks / totalTasks) * 100);
    };

    return {
        "title": projectTitle,
        "addTask": addTask,
        "removeTask": removeTask,
        "getTaskList": getTaskList,
        "getCompletionPercentage": getCompletionPercentage,
    };
}


export default createProject;