(function(TaskManager) {
    "use strict";

    TaskManager.Views.Main = Backbone.View.extend({
        "initialize": function() {
            this.render();
            this.makeTasksSortable();
            this.makeCardsSortable();
            if (localStorage.taskManager) {
                this.retrieveState(JSON.parse(localStorage.taskManager));
            }
        },

        "render": function() {
			this.$el.append(MainTemplate());
            this.$('.list-desc-container').hide();
            this.taskCollection = new TaskManager.Collections.Tasks();
            this.$el.append(Comments());
        },

        "events": {
            "click .show-add-task": "showAddTask",
            "click .hide-add-task": "hideAddTask",
            "click .add-task": "addTask",
            "click .save-tasks": "saveTasks"
        },

        "makeTasksSortable": function() {
            this.$('.tasks-container').sortable({
                "handle": '.header',
                "update": $.proxy(function() {
                    this.updateOrders();
                    this.saveTasks();
                }, this)
            });
        },

        "makeCardsSortable": function() {
            this.$(".cards-container").sortable({
                "connectWith": ".connected-sortable",
                "placeholder": "highlight",
                "receive": $.proxy(function(event, ui) {
                    this.updateAllCardOrders();
                    this.saveTasks();
                }, this),
                "update": $.proxy(function(event, ui) {
                    ui.item.trigger('updateCardOrders');
                    this.saveTasks();
                }, this)
            });
        },

        "updateOrders": function() {
            this.$('.task-container').each(function(index, $task) {
                $($task).trigger('orderUpdated', index);
            });
        },

        "updateAllCardOrders": function() {
            this.$('.task-container').each(function(index, $task) {
                $($task).trigger('updateCardOrders');
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
                $taskContainer,
                taskModel;
            if (title) {
                this.hideAddTask();
                this.createTaskView({
                    "title": title,
                    "order": this.taskCollection.length
                })
                $titleEditor.val('');
                this.makeCardsSortable();
            } else {
                window.alert("Enter title");
            }
        },

        "createTaskView": function(options) {
            var $taskContainer=$(TaskContainer()),
                taskModel;
            this.$('.tasks-container').append($taskContainer);
            taskModel = new TaskManager.Models.Task(options);
            new TaskManager.Views.Task({
                "el": $taskContainer,
                "model": taskModel,
                "cardCollection": options.cardCollection
            });
            this.taskCollection.add(taskModel);
        },

        "retrieveState": function(data) {
            data = _.sortBy(data, 'order');
            _.forEach(data, $.proxy(function(currentTask, index) {
                this.createTaskView(currentTask);
            }, this));
            this.makeCardsSortable();
        },

        "saveTasks": function(event) {
            localStorage.taskManager = JSON.stringify(this.taskCollection);
            if (event) {
                window.alert('Saved!');
            }
        }

    });

    new TaskManager.Views.Main({
        "el": ".interactive-container"
    });

})(window.TaskManager);
