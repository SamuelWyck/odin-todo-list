

const storageManager = (function() {

    const projectKeyPrefix = "p";
    // const taskKeyPrefix = "t";
    const delimiter = "-";

    
    let getProjectKey = function(projectId) {
        return projectKeyPrefix + delimiter + String(projectId);
    };

    // let getTaskKey = function(taskId, projectId) {
    //     return taskKeyPrefix + delimiter + String(taskId) + delimiter + String(projectId);
    // };

    let addProject = function(project) {
        const JSONData = JSON.stringify(project);
        const key = getProjectKey(project.id);

        localStorage.setItem(key, JSONData);
    };

    let removeProject = function(projectId) {
        const key = getProjectKey(projectId);
        localStorage.removeItem(key);
    };

    // let addTask = function(projectId, task) {
    //     const JSONData = JSON.stringify(task);
    //     const key = getTaskKey(task.id, projectId);

    //     localStorage.setItem(key, JSONData);
    // };

    // let removeTask = function(taskId, projectId) {
    //     const key = getTaskKey(taskId, projectId);
    //     localStorage.removeItem(key);
    // };

    let getProjects = function() {
        const projectList = [];

        for (let i = 0; i < localStorage.length; i += 1) {
            const key = localStorage.key(i);
            const [prefix, id] = key.split(delimiter);
            if (prefix !== projectKeyPrefix) {
                continue;
            }
            const JSONData = localStorage.getItem(key);
            const project = JSON.parse(JSONData);
            projectList.push(project);
        }

        return projectList;
    };

    return {
        "addProject": addProject,
        "removeProject": removeProject,
        "getProjects": getProjects,
    };
})();


export default storageManager;