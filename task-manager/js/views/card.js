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
            "click .cancel-change": "removeEditModal",
            "click .add-comments": "addComments"
        },

        "render": function() {
            this.$el.append(CardTemplate());
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
            this.$el.append(CardEditTemplate());
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
            this.$('.edit-modal').remove();
        },

        "displayComments": function($container) {
            var comments = this.model.get('comments');
            $container.empty();
            _.forEach(comments, function(currentComment) {
                $container.append('<li>' + currentComment + '</li>');
            });
        },

        "addComments": function() {
            var $modal = $('#myModal');
            $modal.modal('show')
                .find('.btn-primary').off().on("click", $.proxy(function() {
                    var textarea = $modal.find('textarea'),
                        comment = textarea.val();
                    if (comment) {
                        this.model.get('comments').push(comment);
                        textarea.val('');
                        $modal.find('.comments-container').append('<li>' + comment + '</li>');
                    }
                }, this));
            this.displayComments($modal.find('.comments-container'));
        },

        "deleteCard": function() {
            this.model.destroy();
        }
    });

})(window.TaskManager);
