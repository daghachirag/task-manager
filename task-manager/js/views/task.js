(function(TaskManager) {
    "use strict";

    TaskManager.Views.Task = Backbone.View.extend({
        "initialize": function(options) {
            var cardCollection = new TaskManager.Collections.Cards();
            this.model.set('cardCollection', cardCollection);
            this.render();
            if (options.cardCollection) {
                this.retriveCards(options.cardCollection);
            }
        },

        "render": function() {
			this.$el.append(ListTemplate());
            this.hideAddCard();
            this.changeTaskTitle();
            this.listenTo(this.model, 'destroy', function() {
                this.remove();
            })
            .listenTo(this.model, 'change:title', $.proxy(this.changeTaskTitle, this));
            this.$('.cards-container').insertAfter(this.$('.header'));
            this.$el.on('orderUpdated', $.proxy(function(event, index) {
                    this.model.set("order", index);
                }, this))
                .on('updateCardOrders', $.proxy(function() {
                    var collection =  this.model.get('cardCollection');
                    collection.reset([]);
                    this.$('.card-container').each(function(index, card) {
                        $(card).trigger('orderUpdated', {index: index, collection: collection});
                    });
                }, this));
            this.$('[data-toggle="tooltip"]').tooltip();
        },

        "events": {
            "click .show-add-card": "showAddCard",
            "click .hide-add-card": "hideAddCard",
            "click .add-card": "addCard",
            "click .delete-task": "deleteTask",
            "click .edit-task": "editTask",
            "click .change-task": "changeTask",
            "click .cancel-task-change": "removeEditModal"
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
                content = $cardEditor.val();
            if (content) {
                this.hideAddCard();
                this.createCardView({
                    "content": content,
                    "order": this.model.get('cardCollection').length
                });
                $cardEditor.val('');
            } else {
                window.alert("Enter content");
            }
        },

        "createCardView": function(options) {
            var $cardContainer,
                cardModel;
            $cardContainer = $('<div>').addClass('card-container');
            this.$('.cards-container').append($cardContainer);
            cardModel = new TaskManager.Models.Card(options);
            new TaskManager.Views.Card({
                "el": $cardContainer,
                "model": cardModel
            });
            this.model.get('cardCollection').add(cardModel);
        },

        "editTask": function() {
			this.$el.append(EditTemplate);
            this.$('.change-task-editor').val(this.model.get('title'));
        },

        "changeTask": function() {
            this.model.set('title', this.$('.change-task-editor').val());
            this.removeEditModal();
        },

        "changeTaskTitle": function() {
            this.$('.title-content').html(this.model.get('title'));
        },

        "removeEditModal": function() {
            this.$('.edit-modal').remove();
        },

        "deleteTask": function() {
            _.invoke(this.model.get('cardCollection').toArray(), 'destroy');
            this.model.destroy();
        },

        "retriveCards": function(data) {
            data = _.sortBy(data, 'order');
            _.forEach(data, $.proxy(function(currentTask, index) {
                this.createCardView(currentTask);
            }, this));
        }

    });

})(window.TaskManager);
