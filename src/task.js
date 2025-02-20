import { format } from "date-fns";

function Task(title, description, dueYear, dueMonth, dueDay, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueYear, dueMonth, dueDay);
    this.priority = priority;
    this.completed = false;
};


Task.prototype.toggleCompleted = function() {
    this.completed = !this.completed;
};

Task.prototype.getDate = function() {
    return format(this.dueDate, "MMMM do yyyy");
};


export default Task;