(function(TaskManager) {
    "use strict";

    TaskManager.Views.Main = Backbone.View.extend({
        "initialize": function() {
            this.render();
            this.makeTasksSortable();
            this.makeCardsSortable();
        },

        "render": function() {
            this.$el.append('<div class="tasks-container">' + '</div><div class="list-desc-container">' +
                '<textarea class="title-editor"></textarea>'+
                '<div class="add-task">Add</div><div class="hide-add-task">Cancel</div></div>'+
                 '<div class="show-add-task">Add List...</div>');
            this.$('.list-desc-container').hide();
        },

        "events": {
            "click .show-add-task": "showAddTask",
            "click .hide-add-task": "hideAddTask",
            "click .add-task": "addTask"
        },

        "makeTasksSortable": function() {
            this.$('.tasks-container').sortable({
                "handle": '.header'
            });
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

        "showAddTask": function() {
            this.$('.list-desc-container').show();
            this.$('.show-add-task').hide();
        },

        "hideAddTask": function() {
            this.$('.list-desc-container').hide();
            this.$('.show-add-task').show();
        },

        "addTask": function() {
            var $titleEditor = this.$('.list-desc-container').find('.title-editor'),
                title = $titleEditor.val(),
                $taskContainer;
            if (title) {
                this.hideAddTask();
                $taskContainer = $('<div>').addClass('task-container');
                $taskContainer.append('<div class="cards-container connected-sortable"></div>');
                this.$('.tasks-container').append($taskContainer);
                new TaskManager.Views.Task({
                    "el": $taskContainer,
                    "model": new TaskManager.Models.Task({
                        "title": title
                    })
                });
                $titleEditor.val('');
                this.makeCardsSortable();
            } else {
                window.alert("Enter title");
            }
        }
    });


    new TaskManager.Views.Main({
        "el": ".interactive-container"
    });

})(window.TaskManager);
