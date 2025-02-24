import createProject from "./project.js";


const todoList = (function() {
    const defaultProjectId = 0;
    let projectList = [];
    projectList.push(createProject("General Tasks", setId=defaultProjectId));


    let addProject = function(title) {
        const project = createProject(title);
        projectList.push(project);
        return project;
    };

    let removeProject = function(id) {
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
        for (let project of projectList) {
            if (project.id === id) {
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

    return {
        "addProject": addProject,
        "removeProject": removeProject,
        "editProjectTitle": editProjectTitle,
        "getProject": getProject,
        "getProjectList": getProjectList,
        "setProjectList": setProjectList,
    };
})();


export default todoList;