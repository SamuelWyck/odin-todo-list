

const storageManager = (function() {

    const projectKeyPrefix = "p-";
    const taskKeyPrefix = "t-";

    
    let getProjectKey = function(projectId) {
        return projectKeyPrefix + String(projectId);
    };

    let getTaskKey = function(taskId, projectId) {
        return taskKeyPrefix + String(taskId) + String(projectId);
    };

    let addProject = function(project) {
        const JSONData = JSON.stringify(project);
        const key = getProjectKey(project.id);

        localStorage.setItem(key, JSONData);
    };

    let removeProject = function(projectId) {
        const key = getProjectKey(projectId);
        localStorage.removeItem(key);
    };

    let addTask = function(projectId, task) {
        const JSONData = JSON.stringify(task);
        const key = getTaskKey(task.id, projectId);

        localStorage.setItem(key, JSONData);
    };

    let removeTask = function(taskId, projectId) {
        const key = getTaskKey(taskId, projectId);
        localStorage.removeItem(key);
    };


})();