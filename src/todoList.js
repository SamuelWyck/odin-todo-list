import createProject from "./project.js";


const todoList = (function() {
    const defaultProjectId = 0;
    let projectList = [];

    const defaultProject = createProject("General Tasks", defaultProjectId);
    defaultProject.addTask("Clean Dishwasher", "Clean out filter and spray nozzels in the dishwasher.", 2025, 1, 28, 0, 0);
    defaultProject.addTask("Paint Living Room", "Paint the Living Room in two coats of peach colored paint.", 2025, 7, 13, 1, 1);
    defaultProject.addTask("Clean out Refrigerator", "Clean out the moldy food in the refrigerator.", 2025, 4, 5, 2, 2);
    defaultProject.addTask("Take over the World", "Complete evil plan to take over the world.", 2026, 11, 10, 3, 3);

    projectList.push(defaultProject);


    let addProject = function(title) {
        const project = createProject(title);
        projectList.push(project);
        return project;
    };

    let removeProject = function(id) {
        id = Number(id);
        if (id === defaultProjectId) {
            return null;
        }
        let newProjectList = []
        let removedProject = null;

        for (let project of projectList) {
            if (project.id !== id) {
                newProjectList.push(project);
            } else {
                removedProject = project;
            }
        }

        projectList = newProjectList;
        return removedProject;
    };

    let editProjectTitle = function(id, title) {
        if (id === defaultProjectId) {
            return false;
        }
        for (let project of projectList) {
            if (project.id === id) {
                project.title = title;
                return true;
            }
        }
        return false;
    };

    let getProject = function(id) {
        const projectId = Number(id);
        for (let project of projectList) {
            if (project.id === projectId) {
                return project;
            }
        }
        return null;
    };

    let getProjectList = function() {
        return projectList;
    };

    let setProjectList = function(list) {
        projectList = list;
    };

    let getDefaultProjectId = function() {
        return defaultProjectId;
    }

    return {
        "addProject": addProject,
        "removeProject": removeProject,
        "editProjectTitle": editProjectTitle,
        "getProject": getProject,
        "getProjectList": getProjectList,
        "setProjectList": setProjectList,
        "getDefaultProjectId": getDefaultProjectId,
    };
})();


export default todoList;