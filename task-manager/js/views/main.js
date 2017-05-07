(function(TaskManager) {
    "use strict";

    TaskManager.Views.Main = Backbone.View.extend({
        "initialize": function() {
            this.render();
            this.makeTasksSortable();
            this.makeCardsSortable();
        },

        "render": function() {
            this.$el.append('<div class="tasks-container"></div><div class="add-task">Add List...</div>')
        },

        "events": {
            "click .add-task": "addTask"
        },

        "makeTasksSortable": function() {
            this.$('.tasks-container').sortable();
        },

        "makeCardsSortable": function() {
            this.$(".cards-container").sortable({
                "connectWith": ".connected-sortable",
                "placeholder": "highlight",
                "receive": function(event, ui) {
                    console.log("dropped on = " + this.id); // Where the item is dropped
                    console.log("sender = " + ui.sender[0].id); // Where it came from
                    console.log("item = " + ui.item[0].innerHTML); //Which item (or ui.item[0].id)
                }
            });
        },

        "addTask": function() {
            var $taskContainer = $('<div>').addClass('task-container');
            $taskContainer.append('<div class="cards-container connected-sortable"></div>');
            this.$('.tasks-container').append($taskContainer);
            new TaskManager.Views.Task({
                "el": $taskContainer
            });
            this.makeCardsSortable();
        }
    });


    new TaskManager.Views.Main({
        "el": ".interactive-container"
    });

})(window.TaskManager);
