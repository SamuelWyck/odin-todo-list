

const taskFormFactory = (function() {

    let createBtn = function(text, type, className) {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.type = type;
        btn.classList.add(className);
        return btn;
    };

    let createExitBtnSection = function() {
        const div = document.createElement("div");
        div.classList.add("exit-btn-div");

        const btn = createBtn("X", "button", "exit-btn");
        div.appendChild(btn);

        return div;
    };

    let createLabel = function(text, id) {
        const label = document.createElement("label");
        label.textContent = text;
        label.htmlFor = id;
        return label;
    };

    let createInput = function(value, name, id, type, date=false) {
        const input = document.createElement("input");
        input.name = name;
        input.id = id;
        input.type = type;
        if (!date) {
            input.value = value;
        } else {
            input.valueAsDate = value;
        }
        return input;
    };

    let createTitleAndDateSection = function(task) {
        const section = document.createElement("div");
        section.classList.add("title-date-div");

        let titleValue = "";
        let dateValue = "";
        if (task !== null) {
            titleValue = task.title;
            dateValue = task.dueDate
        }

        const titleDiv = document.createElement("div");
        titleDiv.appendChild(createLabel("Title", "title"));
        titleDiv.appendChild(createInput(titleValue, "title", "title", "text"));
        section.appendChild(titleDiv);

        const dateDiv = document.createElement("div");
        dateDiv.appendChild(createLabel("Date", "date"));
        dateDiv.appendChild(createInput(dateValue, "date", "date", "date", true));
        section.appendChild(dateDiv);

        return section;
    };

    let createOption = function(text, value, priority) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        if (value === priority) {
            option.selected = true;
        }
        return option;
    };

    let createSelect = function(task, name, id) {
        const select = document.createElement("select");
        select.id = id;
        select.name = name;

        let priority = 0;
        if (task !== null) {
            priority = task.priority;
        }

        select.appendChild(createOption("None", 0, priority));
        select.appendChild(createOption("Low", 1, priority));
        select.appendChild(createOption("Medium", 2, priority));
        select.appendChild(createOption("High", 3, priority));

        return select;
    };

    let createPrioritySection = function(task) {
        const section = document.createElement("div");

        section.appendChild(createLabel("Priority", "priority"));
        section.appendChild(createSelect(task, "priority", "priority"));

        return section;
    };

    let createBtnSection = function(edit) {
        const section = document.createElement("div");
        if (edit) {
            section.classList.add("edit-task-btn-div");
            section.appendChild(createBtn("Delete", "button", "del-btn"));
        } else {
            section.classList.add("create-task-btn-div");
        }

        section.appendChild(createBtn("Save", "submit", "save-btn"));
        
        return section;
    };

    let createTextArea = function(value, name, id) {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.name = name;
        textArea.id = id;
        return textArea;
    };

    let createTextAreaSection = function(task) {
        const section = document.createElement("div");

        let textValue = "";
        if (task !== null) {
            textValue = task.description;
        }

        section.appendChild(createLabel("Description", "description"));
        section.appendChild(createTextArea(textValue, "description", "description"));

        return section;
    };

    let createHiddenInput = function(name, value) {
        const input = document.createElement("input");
        input.hidden = true;
        input.name = name;
        input.value = value;
        return input;
    };

    let createFormElement = function(edit, task) {
        const form = document.createElement("form");
        form.action = "#";

        if (task !== null) {
            form.appendChild(createHiddenInput("taskId", task.id));
        }

        form.appendChild(createTitleAndDateSection(task));
        form.appendChild(createPrioritySection(task));
        form.appendChild(createTextAreaSection(task));
        form.appendChild(createBtnSection(edit));

        return form;
    };
    
    let createTaskFormPopup = function(edit=false, task=null) {
        const body = document.querySelector("body");
        
        const popup = document.createElement("div");
        popup.classList.add("popup");

        popup.appendChild(createExitBtnSection());
        popup.appendChild(createFormElement(edit, task));

        body.appendChild(popup);

        return popup;
    };

    return {
        "createTaskFormPopup": createTaskFormPopup,
    };
})();


export default taskFormFactory;