import { format } from "date-fns";

function Task(title, description, dueYear, dueMonth, dueDay, priority, id=null) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueYear, dueMonth, dueDay);
    this.priority = priority;
    this.completed = false;
    this.id = id;
    if (this.id === null) {
        this.id = Date.now();
    }
};


Task.prototype.setDate = function(date) {
    this.dueDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000));
};

Task.prototype.toggleCompleted = function() {
    this.completed = !this.completed;
};

Task.prototype.getDueDate = function() {
    return format(this.dueDate, "MMM do yyyy");
};

Task.prototype.setDueDate = function(year, month, day) {
    this.dueDate = new Date(year, month, day);
};


export default Task;