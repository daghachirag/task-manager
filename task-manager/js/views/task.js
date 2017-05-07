(function(TaskManager) {
    "use strict";

    TaskManager.Views.Task = Backbone.View.extend({
        "initialize": function() {

            this.render();
        },

        "render": function() {
            var $header = $('<div></div>').addClass('header');

            $header.append('<div class="title-content"></div><div class="delete-task">X</div>');

            this.$el.append('<div class="card-desc-container">' +
                '<textarea class="card-editor"></textarea>'+
                '<div class="add-card">Add</div><div class="hide-add-card">Cancel</div></div>'+
                 '<div class="show-add-card">Add Card...</div>');
            this.$el.prepend($header);
            this.hideAddCard();
            this.$('.title-content').html(this.model.get('title'));
        },

        "events": {
            "click .show-add-card": "showAddCard",
            "click .hide-add-card": "hideAddCard",
            "click .add-card": "addCard",
            "click .delete-task": "deleteTask"
        },

        "showAddCard": function() {
            this.$('.card-desc-container').show();
            this.$('.show-add-card').hide();
        },

        "hideAddCard": function() {
            this.$('.card-desc-container').hide();
            this.$('.show-add-card').show();
        },

        "addCard": function() {
            var $cardEditor = this.$('.card-desc-container').find('.card-editor'),
                content = $cardEditor.val(),
                $cardContainer;
            if (content) {
                this.hideAddCard();
                $cardContainer = $('<div>').addClass('card-container');
                this.$('.cards-container').append($cardContainer);
                new TaskManager.Views.Card({
                    "el": $cardContainer,
                    "model": new TaskManager.Models.Card({
                        "content": content
                    })
                });
                $cardEditor.val('');
            } else {
                window.alert("Enter content");
            }
        },

        "deleteTask": function() {
            this.remove();
        }

    });

})(window.TaskManager);
