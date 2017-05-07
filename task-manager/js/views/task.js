(function(Trello) {
    "use strict";

    Trello.Views.Task = Backbone.View.extend({
        "initialize": function() {
            this.render();
        },
        "render": function() {
            var $addCard = $('<div>').addClass('add-card');
            this.$el.append($addCard);
        },
        "events": {
            "click .add-card": "addCard"
        },
        "addCard": function() {
            this.$('.cards-container').prepend('<div class="card-container"></div>');
        }
    });

})(window.Trello);
