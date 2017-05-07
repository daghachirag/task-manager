(function(TaskManager) {
    "use strict";

    TaskManager.Collections.Cards = Backbone.Collection.extend({
        "model": TaskManager.Models.Card
    });

})(window.TaskManager);
