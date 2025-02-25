import Task from "./task.js";

function createProject(title, setId=null) {
    let projectTitle = title;
    let id = setId;
    if (id === null) {
        id = Date.now();
    }
    let taskList = [];


    let addTask = function(title, description, dueYear, dueMonth, dueDay, priority, id=null) {
        const task = new Task(title, description, Number(dueYear), Number(dueMonth), Number(dueDay), priority, id);
        taskList.push(task);
        return task;
    };

    let removeTask = function(taskId) {
        let newTaskList = [];
        let removedTask = null;
        const id = Number(taskId);

        for (let task of taskList) {
            if (task.id !== id) {
                newTaskList.push(task);
            } else {
                removedTask = task;
            }
        }
        taskList = newTaskList;
        return removedTask;
    };

    let getTask = function(taskId) {
        const id = Number(taskId);
        for (let task of taskList) {
            if (task.id === id) {
                return task;
            }
        }
        return null;
    };

    let editTask = function(taskId, newInfo) {
        const task = getTask(taskId);
        if (task === null) {
            return false;
        }

        task.title = newInfo["title"];
        task.dueDate = new Date(newInfo["date"]);
        task.description = newInfo["description"];
        task.priority = newInfo["priority"];
        return true;
    };

    let getCompletionPercentage = function() {
        let totalTasks = taskList.length;
        if (totalTasks === 0) {
            return "0%";
        }
        let completedTasks = 0;

        for (let task of taskList) {
            if (task.completed) {
                completedTasks += 1;
            }
        }

        const percent = Math.round((completedTasks / totalTasks) * 100);
        return `${percent}%`;
    };

    return {
        "id": id,
        "title": projectTitle,
        "taskList": taskList,
        "addTask": addTask,
        "removeTask": removeTask,
        "getCompletionPercentage": getCompletionPercentage,
        "getTask": getTask,
        "editTask": editTask,
    };
}


export default createProject;