(function(Trello) {
    "use strict";

    Trello.Views.Card = Backbone.View.extend({
        "defaults": function() {
            return {
                "title": '',
                "createdAt": new Date().toString(),
                "createdBy": this.getUser(),
                "order": 0
            };
        },

        "getUser": function() {
            return "Chirag Dagha";
        }
    });

})(window.Trello);
