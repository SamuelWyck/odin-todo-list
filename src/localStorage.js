

const storageManager = (function() {

    const projectKeyPrefix = "p-";

    
    let addProject = function(project) {
        const id = project.id;
        const JSONData = JSON.stringify(project);
        const key = projectKeyPrefix + String(id);

        localStorage.setItem(key, JSONData);
    };

    let removeProject = function(projectId) {
        const key = projectKeyPrefix + String(projectId);
        localStorage.removeItem(key);
    };


})();