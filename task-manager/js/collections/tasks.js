(function(TaskManager) {
    "use strict";

    TaskManager.Collections.Tasks = Backbone.Collection.extend({
        "model": TaskManager.Models.Task
    });

})(window.TaskManager);
