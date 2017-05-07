(function(TaskManager) {
    "use strict";

    TaskManager.Views.Task = Backbone.View.extend({
        "initialize": function() {
            this.model = new TaskManager.Models.Task();
            this.render();
        },
        "render": function() {
            var $addCard = $('<div>Add Card...</div>').addClass('add-card');
            this.$el.append($addCard);
        },
        "events": {
            "click .add-card": "addCard"
        },
        "addCard": function() {
            this.$('.cards-container').prepend('<div class="card-container"></div>');
        }
    });

})(window.TaskManager);
