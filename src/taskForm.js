

const createTaskForm = function() {

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

    let createInput = function(name, id, type) {
        const input = document.createElement("input");
        input.name = name;
        input.id = id;
        input.type = type;
        return input;
    };

    let createTitleAndDateSection = function() {
        const section = document.createElement("div");
        section.classList.add("title-date-div");

        const titleDiv = document.createElement("div");
        titleDiv.appendChild(createLabel("Title", "title"));
        titleDiv.appendChild(createInput("title", "title", "text"));
        section.appendChild(titleDiv);

        const dateDiv = document.createElement("div");
        dateDiv.appendChild(createLabel("Date", "date"));
        dateDiv.appendChild(createInput("date", "date", "date"));
        section.appendChild(dateDiv);

        return section;
    };

    let createOption = function(text, value) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        return option;
    };

    let createSelect = function(name, id) {
        const select = document.createElement("select");
        select.id = id;
        select.name = name;

        select.appendChild(createOption("None", 0));
        select.appendChild(createOption("Low", 1));
        select.appendChild(createOption("Medium", 2));
        select.appendChild(createOption("High", 3));

        return select;
    };

    let createPrioritySection = function() {
        const section = document.createElement("div");

        section.appendChild(createLabel("Priority", "priority"));
        section.appendChild(createSelect("priority", "priority"));

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

    let createFormElement = function(edit) {
        const form = document.createElement("form");
        form.action = "#";

        form.appendChild(createTitleAndDateSection());
        form.appendChild(createPrioritySection());
        form.appendChild(createBtnSection(edit));
    };
    
    let createTaskFormPopup = function(edit=false) {
        const body = document.querySelector("body");
        
        const popup = document.createElement("div");
        popup.classList.add("popup");

        popup.appendChild(createExitBtnSection());
        popup.appendChild(createFormElement(edit));

        body.appendChild(popup);
    };

    return {
        "createTaskFormPopup": createTaskFormPopup,
    };
};


export default createTaskForm;