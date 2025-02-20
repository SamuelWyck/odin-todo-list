import { format } from "date-fns";

function Task(title, description, dueYear, dueMonth, dueDay, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueYear, dueMonth, dueDay);
    this.priority = priority;
    this.completed = false;
    this.id = Date.now();
};


Task.prototype.toggleCompleted = function() {
    this.completed = !this.completed;
};

Task.prototype.getDueDate = function() {
    return format(this.dueDate, "MMMM do yyyy");
};

Task.prototype.setDueDate = function(year, month, day) {
    this.dueDate = new Date(year, month, day);
};


export default Task;