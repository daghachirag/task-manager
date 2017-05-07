(function(TaskManager) {
    "use strict";

    TaskManager.Views.Card = Backbone.View.extend({
        "initialize": function(options) {
            this.cardCollection = options.cardCollection;
            this.render();
        },

        "events": {
            "click .delete-card": "deleteCard",
            "click .edit-card": "editCard",
            "click .change-card": "changeCard",
            "click .cancel-change": "removeEditModal"
        },

        "render": function() {
            this.$el.append('<div class="content-container"></div><div class="edit-card">E</div><div class="delete-card">X</div>');
            this.changeCardText();
            this.listenTo(this.model, 'destroy', function() {
                    this.remove();
                })
                .listenTo(this.model, 'change:content', $.proxy(this.changeCardText, this));
            this.$el.on('orderUpdated', $.proxy(function(event, data) {
                data.collection.add(this.model);
                this.model.set("order", data.index);
            }, this));
        },

        "editCard": function() {
            this.$el.append('<div class="modal">' +
                '<div class="change-card-container"><textarea class="change-card-editor"></textarea>' +
                '<div class="change-card">Add</div><div class="cancel-change">Cancel</div></div>' +
                '</div></div>');
            this.$('.change-card-editor').val(this.model.get('content'));
        },

        "changeCard": function() {
            this.model.set('content', this.$('.change-card-editor').val());
            this.removeEditModal();
        },

        "changeCardText": function() {
            this.$('.content-container').html(this.model.get('content'));
        },

        "removeEditModal": function() {
            this.$('.modal').remove();
        },

        "deleteCard": function() {
            this.model.destroy();
        }
    });

})(window.TaskManager);
