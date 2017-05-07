(function(TaskManager) {
    "use strict";

    TaskManager.Views.Card = Backbone.View.extend({
        "initialize": function() {
            this.render();
        },

        "events": {
            "click .delete-card": "deleteCard"
        },

        "render": function() {
            this.$el.append('<div class="content-container"></div><div class="delete-card">X</div>');
            this.$('.content-container').html(this.model.get('content'));
        },

        "deleteCard": function() {
            this.remove();
        }
    });

})(window.TaskManager);
