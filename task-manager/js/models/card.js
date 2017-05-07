(function(TaskManager) {
    "use strict";

    TaskManager.Models.Card = Backbone.Model.extend({
        "defaults": function() {
            return {
                "title": '',
                "createdAt": new Date().toString(),
                "createdBy": this.getUser(),
                "order": 0
            };
        },

        "getUser": function() {
            return "Chirag Dagha";
        }
    });

})(window.TaskManager);
