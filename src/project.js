import Task from "./task.js";

function Project(title, setId=null) {
    this.title = title;
    this.id = setId;
    if (this.id === null) {
        this.id = Date.now();
    }
    this.taskList = [];


    this.addTask = function(title, description, dueYear, dueMonth, dueDay, priority, completed=false, id=null) {
        const task = new Task(title, description, Number(dueYear), Number(dueMonth), Number(dueDay), priority, completed, id);
        this.taskList.push(task);
        return task;
    };

    this.removeTask = function(taskId) {
        let newTaskList = [];
        let removedTask = null;
        const id = Number(taskId);

        for (let task of this.taskList) {
            if (task.id !== id) {
                newTaskList.push(task);
            } else {
                removedTask = task;
            }
        }
        this.taskList = newTaskList;
        return removedTask;
    };

    this.getTask = function(taskId) {
        const id = Number(taskId);
        for (let task of this.taskList) {
            if (task.id === id) {
                return task;
            }
        }
        return null;
    };

    this.editTask = function(taskId, newInfo) {
        const task = this.getTask(taskId);
        if (task === null) {
            return null;
        }

        task.title = newInfo["title"];
        task.setDate(new Date(newInfo["date"]));
        task.description = newInfo["description"];
        task.priority = newInfo["priority"];
        return task;
    };

    this.getCompletionPercentage = function() {
        let totalTasks = this.taskList.length;
        if (totalTasks === 0) {
            return "0%";
        }
        let completedTasks = 0;

        for (let task of this.taskList) {
            if (task.completed) {
                completedTasks += 1;
            }
        }

        const percent = Math.round((completedTasks / totalTasks) * 100);
        return `${percent}%`;
    };
}


export default Project;